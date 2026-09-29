import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

logger = logging.getLogger(__name__)

db_url = settings.DATABASE_URL
engine = None

# Attempt to connect to configured DATABASE_URL (MySQL by default)
try:
    if "mysql" in db_url:
        engine = create_engine(
            db_url,
            pool_pre_ping=True,
            pool_recycle=3600,
            pool_size=10,
            max_overflow=20,
        )
        # Test connection
        with engine.connect() as conn:
            logger.info("Successfully connected to MySQL database.")
    else:
        engine = create_engine(
            db_url,
            connect_args={"check_same_thread": False} if "sqlite" in db_url else {},
        )
except Exception as e:
    if settings.SQLITE_FALLBACK:
        logger.warning(f"Could not connect to MySQL ({e}). Falling back to SQLite for local execution.")
        db_url = "sqlite:///./navraksh_db.sqlite"
        engine = create_engine(
            db_url,
            connect_args={"check_same_thread": False},
        )
    else:
        raise e

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
