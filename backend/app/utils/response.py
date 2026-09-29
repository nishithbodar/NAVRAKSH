from typing import Any, Optional
from pydantic import BaseModel

class StandardResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None
    message: str = "Operation completed successfully"

def success_response(data: Any = None, message: str = "Success") -> dict:
    return {
        "success": True,
        "data": data,
        "message": message,
    }

def error_response(code: str, message: str, details: Optional[dict] = None) -> dict:
    return {
        "success": False,
        "error": {
            "code": code,
            "message": message,
            "details": details or {},
        },
    }
