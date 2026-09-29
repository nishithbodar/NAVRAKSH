from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
    username: str

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    role: Optional[str] = "OPERATOR"

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True
