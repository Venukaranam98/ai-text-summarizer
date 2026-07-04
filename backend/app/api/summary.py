import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings
from app.db.session import get_db
from app.deps import get_current_user
from app.exceptions import SummaryGenerationError
from app.models.summary import Summary
from app.models.user import User
from app.schemas.summary import PaginatedSummaryResponse, SummaryCreateRequest, SummaryResponse
from app.services.llm import LLMServiceError, generate_summary

router = APIRouter(prefix="/summary", tags=["summary"])
limiter = Limiter(key_func=get_remote_address)


@router.post("/", response_model=SummaryResponse, status_code=201)
@limiter.limit(settings.SUMMARY_RATE_LIMIT)
def create_summary(
    request: Request,
    payload: SummaryCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        summary_text = generate_summary(text=payload.text, mode=payload.mode)
    except LLMServiceError as exc:
        raise SummaryGenerationError(str(exc))

    summary = Summary(
        user_id=current_user.id,
        original_text=payload.text,
        mode=payload.mode,
        summary_text=summary_text,
    )
    db.add(summary)
    db.commit()
    db.refresh(summary)
    return summary


@router.get("/", response_model=PaginatedSummaryResponse)
def list_summaries(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    base_query = select(Summary).where(Summary.user_id == current_user.id)

    total = db.scalar(select(func.count()).select_from(base_query.subquery()))

    items = db.scalars(
        base_query.order_by(Summary.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).all()

    return PaginatedSummaryResponse(total=total or 0, page=page, page_size=page_size, items=items)


@router.get("/{summary_id}", response_model=SummaryResponse)
def get_summary(
    summary_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        summary_uuid = uuid.UUID(summary_id)
    except ValueError:
        raise HTTPException(status_code=422, detail="Invalid summary id")

    summary = db.scalar(
        select(Summary).where(Summary.id == summary_uuid, Summary.user_id == current_user.id)
    )
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")

    return summary
