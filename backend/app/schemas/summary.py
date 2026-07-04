import uuid
from datetime import datetime

from pydantic import BaseModel, Field

from app.models.summary import SummaryMode


class SummaryCreateRequest(BaseModel):
    text: str = Field(min_length=1, max_length=20000, description="The text to summarize")
    mode: SummaryMode = Field(description="One of: brief, detailed, bullet_points")


class SummaryResponse(BaseModel):
    id: uuid.UUID
    original_text: str
    mode: SummaryMode
    summary_text: str
    created_at: datetime

    model_config = {"from_attributes": True}


class PaginatedSummaryResponse(BaseModel):
    total: int
    page: int
    page_size: int
    items: list[SummaryResponse]
