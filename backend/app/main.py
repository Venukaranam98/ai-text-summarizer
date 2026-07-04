import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api.auth import router as auth_router
from app.api.summary import limiter
from app.api.summary import router as summary_router
from app.core.config import settings
from app.core.logging_config import setup_logging
from app.exceptions import AppException

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Text Summarizer API",
    description="Backend for the AI Text Summarizer project. Accepts text + mode, "
    "returns an LLM-generated summary, and persists summary history per user.",
    version="1.0.0",
)

# --- Rate limiting ---
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Global exception handler for domain errors ---
@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


# --- Fallback handler for unexpected errors ---
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception on %s %s", request.method, request.url)
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}


app.include_router(auth_router)
app.include_router(summary_router)
