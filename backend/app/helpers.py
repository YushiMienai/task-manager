from app.schemas.task import Task
from typing import List


def task_to_dict(db_task) -> dict:
    return {
        "id": db_task.id,
        "title": db_task.title,
        "description": db_task.description,
        "status": db_task.status.value,
        "created_at": db_task.created_at
    }


def tasks_to_dict_list(db_tasks: List[Task]) -> List[dict]:
    return [task_to_dict(task) for task in db_tasks]