import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "NAVRAKSH — Intelligent Navratri Pass Management and Sales Optimization System"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "navraksh_super_secret_jwt_key_2026_dsa_engine_optimal")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    
    # Primary MySQL database with optional SQLite fallback if MySQL daemon is not running in current environment
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mysql+pymysql://root:password@localhost:3306/navraksh_db")
    SQLITE_FALLBACK: bool = os.getenv("SQLITE_FALLBACK", "true").lower() in ("true", "1", "yes")
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
