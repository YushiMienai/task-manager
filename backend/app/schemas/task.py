from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.task import TaskStatus


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.PENDING


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class Task(TaskBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
