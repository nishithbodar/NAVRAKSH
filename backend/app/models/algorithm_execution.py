import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from app.core.database import Base

class AlgorithmExecution(Base):
    __tablename__ = "algorithm_executions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    algorithm_name = Column(String(100), index=True, nullable=False)
    category = Column(String(100), index=True, nullable=False)  # sorting, searching, greedy, dynamic_programming, etc.
    input_size = Column(Integer, nullable=False)
    execution_time_ms = Column(Float, nullable=False)
    comparisons = Column(Integer, default=0, nullable=False)
    swaps_or_rotations = Column(Integer, default=0, nullable=False)
    memory_estimate = Column(String(100), nullable=True)
    time_complexity = Column(String(50), nullable=False)
    space_complexity = Column(String(50), nullable=False)
    metadata_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
