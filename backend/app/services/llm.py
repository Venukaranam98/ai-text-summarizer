import logging

from groq import Groq

from app.core.config import settings
from app.models.summary import SummaryMode

logger = logging.getLogger(__name__)

_client = Groq(api_key=settings.GROQ_API_KEY)

_MODE_INSTRUCTIONS: dict[SummaryMode, str] = {
    SummaryMode.BRIEF: (
        "Summarize the following text in 2-3 concise sentences. "
        "Capture only the single most important point. Do not add opinions."
    ),
    SummaryMode.DETAILED: (
        "Summarize the following text in a detailed paragraph. "
        "Cover the important points and necessary context, but do not simply repeat the original verbatim."
    ),
    SummaryMode.BULLET_POINTS: (
        "Summarize the following text as a concise bulleted list of the key points. "
        "Use '- ' before each bullet. Do not add any text before or after the list."
    ),
}


class LLMServiceError(Exception):
    """Raised when the LLM provider fails to generate a summary."""


def generate_summary(text: str, mode: SummaryMode) -> str:
    instruction = _MODE_INSTRUCTIONS[mode]

    try:
        response = _client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You are a precise, neutral text summarization assistant."},
                {"role": "user", "content": f"{instruction}\n\nText:\n{text}"},
            ],
            temperature=0.3,
            max_tokens=1024,
        )
        content = response.choices[0].message.content
        if not content:
            raise LLMServiceError("Empty response from LLM provider")
        return content.strip()
    except LLMServiceError:
        raise
    except Exception as exc:  # noqa: BLE001 - convert any provider error to a domain error
        logger.exception("Groq summarization call failed")
        raise LLMServiceError("Failed to generate summary") from exc
