from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.generate import router as generate_router
from routes.status import router as status_router
from routes.result import router as result_router

# ✔ Import the correct SINGLETONS from services
from services.job_manager_db import job_manager_db as job_manager, get_job_manager_db as get_job_manager
from services.renderer import Renderer

# -----------------------------------------------------------
# STATIC DIRECTORY
# -----------------------------------------------------------

STATIC_DIR = Path(__file__).parent / "static"

# Renderer is already fully created inside job_manager.py
# But if any route needs STATIC_DIR for StaticFiles:
app = FastAPI(
    title="GenWeave AI Backend",
    description="FastAPI backend that powers the GenWeave AI material builder.",
    version="0.1.0",
)

# -----------------------------------------------------------
# CORS
# -----------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------
# ROUTES
# -----------------------------------------------------------

app.include_router(generate_router, prefix="", tags=["generate"])
app.include_router(status_router, prefix="", tags=["status"])
app.include_router(result_router, prefix="", tags=["result"])

# Serve /static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# -----------------------------------------------------------
# HEALTH CHECK
# -----------------------------------------------------------

@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}

# -----------------------------------------------------------
# DEPENDENCY OVERRIDE
# -----------------------------------------------------------

# ✔ Tell FastAPI: whenever a JobManager dependency is requested, use our singleton
app.dependency_overrides[get_job_manager] = lambda: job_manager

