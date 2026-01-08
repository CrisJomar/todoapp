import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import todo
from app import models  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://todoapp-1-8fop.onrender.com",  # <- your frontend on Render
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router, prefix="/todos", tags=["todos"])


@app.get("/")
def root():
    return {"message": "Todo API running"}
