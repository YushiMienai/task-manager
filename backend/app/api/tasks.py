from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.models.database import get_db
from app.models.task import TaskStatus
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.crud.tasks import get_tasks, get_task, create_task, update_task, delete_task
from app.helpers import tasks_to_dict_list, task_to_dict
from app.api.auth import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_new_task(
        task: TaskCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)  # Добавляем авторизацию
):
    db_task = create_task(db=db, task=task)
    return task_to_dict(db_task)


@router.get("/", response_model=list[Task])
def read_tasks(
        skip: int = 0,
        limit: int = 100,
        status: Optional[TaskStatus] = Query(None),
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)  # Добавляем авторизацию
):
    tasks = get_tasks(db, skip=skip, limit=limit, status=status)
    return tasks_to_dict_list(tasks)


@router.get("/{task_id}", response_model=Task)
def read_task(
        task_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)  # Добавляем авторизацию
):
    db_task = get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task_to_dict(db_task)


@router.put("/{task_id}", response_model=Task)
def update_existing_task(
        task_id: int,
        task: TaskUpdate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)  # Добавляем авторизацию
):
    db_task = update_task(db, task_id=task_id, task_update=task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task_to_dict(db_task)


@router.delete("/{task_id}")
def delete_existing_task(
        task_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)  # Добавляем авторизацию
):
    success = delete_task(db, task_id=task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
