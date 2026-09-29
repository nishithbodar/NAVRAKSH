from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User
from app.schemas.auth import Token, LoginRequest, RegisterRequest, UserResponse
from app.utils.response import success_response

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=dict)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == req.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=req.username,
        email=req.email,
        hashed_password=get_password_hash(req.password),
        full_name=req.full_name,
        role=req.role or "OPERATOR"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(subject=user.id, role=user.role)
    return success_response(
        data={
            "user": UserResponse.model_validate(user),
            "access_token": token,
            "token_type": "bearer"
        },
        message="User registered successfully"
    )

@router.post("/login", response_model=dict)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    token = create_access_token(subject=user.id, role=user.role)
    return success_response(
        data={
            "access_token": token,
            "token_type": "bearer",
            "role": user.role,
            "user_id": user.id,
            "username": user.username,
            "full_name": user.full_name
        },
        message="Login successful"
    )

@router.get("/me", response_model=dict)
def get_me(db: Session = Depends(get_db)):
    # Default operator user for demo
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="No users found")
    return success_response(data=UserResponse.model_validate(user))
