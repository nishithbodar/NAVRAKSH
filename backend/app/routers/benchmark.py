from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.algorithm import BenchmarkRequest, BenchmarkResponse
from app.services.algorithm_service import AlgorithmService
from app.models.algorithm_execution import AlgorithmExecution
from app.utils.response import success_response

router = APIRouter(prefix="/benchmark", tags=["Benchmark Engine"])

@router.post("/run", response_model=dict)
def run_benchmark(req: BenchmarkRequest, db: Session = Depends(get_db)):
    result = AlgorithmService.run_benchmark(
        db=db,
        category=req.algorithm_category,
        algorithms=req.algorithms,
        dataset_size=req.dataset_size,
        dataset_type=req.dataset_type
    )
    return success_response(data=result)

@router.get("/history", response_model=dict)
def get_benchmark_history(limit: int = 50, db: Session = Depends(get_db)):
    history = db.query(AlgorithmExecution).order_by(AlgorithmExecution.created_at.desc()).limit(limit).all()
    return success_response(data=[
        {
            "id": h.id,
            "algorithm": h.algorithm_name,
            "category": h.category,
            "input_size": h.input_size,
            "execution_time_ms": h.execution_time_ms,
            "comparisons": h.comparisons,
            "time_complexity": h.time_complexity,
            "created_at": h.created_at.isoformat()
        }
        for h in history
    ])
