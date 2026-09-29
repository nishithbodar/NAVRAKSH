from fastapi import APIRouter
from app.schemas.algorithm import MasterTheoremRequest
from app.algorithms.recurrence.master_theorem import solve_master_theorem
from app.utils.response import success_response

router = APIRouter(prefix="/complexity", tags=["Complexity Analyzer"])

@router.post("/analyze", response_model=dict)
def analyze_recurrence(req: MasterTheoremRequest):
    result = solve_master_theorem(req.expression)
    return success_response(data=result)
