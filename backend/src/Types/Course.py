import datetime
from dataclasses import dataclass

@dataclass
class Course:
    id: int
    title: str
    price: float
    duration_days: int
    max_participants: int
    category_id: int
    description: str = ""
    created_at: datetime = None
    updated_at: datetime = None