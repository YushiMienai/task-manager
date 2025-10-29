from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.tasks import router as tasks_router
from app.api.auth import router as auth_router

app = FastAPI(
    title="Task Manager API",
    description="Simple REST API for task management with authentication",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks_router, prefix="/api/tasks", tags=["tasks"])


@app.get("/")
def read_root():
    return {"message": "Task Manager API with Authentication"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)