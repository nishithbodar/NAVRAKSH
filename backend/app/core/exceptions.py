from fastapi import HTTPException, status
from typing import Any, Dict, Optional

class NavrakshException(HTTPException):
    def __init__(
        self,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        code: str = "BAD_REQUEST",
        message: str = "An error occurred",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status_code,
            detail={
                "success": False,
                "error": {
                    "code": code,
                    "message": message,
                    "details": details or {},
                },
            },
        )

class InsufficientInventoryException(NavrakshException):
    def __init__(self, message: str = "Insufficient pass inventory for requested booking"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="INSUFFICIENT_INVENTORY",
            message=message,
        )

class DuplicateBookingException(NavrakshException):
    def __init__(self, message: str = "Duplicate booking detected for this pass or transaction"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="DUPLICATE_BOOKING",
            message=message,
        )

class InvalidQrException(NavrakshException):
    def __init__(self, message: str = "Invalid or corrupted QR token payload"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            code="INVALID_QR",
            message=message,
        )

class QrAlreadyUsedException(NavrakshException):
    def __init__(self, message: str = "QR pass has already been scanned and verified"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="QR_ALREADY_USED",
            message=message,
        )

class EventConflictException(NavrakshException):
    def __init__(self, message: str = "Event time slot conflicts with existing booking or curfew constraint"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="EVENT_CONFLICT",
            message=message,
        )

class InvalidAlgorithmInputException(NavrakshException):
    def __init__(self, message: str = "Invalid parameter configuration supplied to DAA solver"):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            code="INVALID_ALGORITHM_INPUT",
            message=message,
        )
