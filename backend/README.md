# AI Text Summarizer — Backend

FastAPI backend with JWT auth, Groq-powered text summarization, and PostgreSQL (Neon) storage.

## Stack
FastAPI · PostgreSQL (Neon) + SQLAlchemy · Alembic · JWT auth · Groq

## Folder Structure
backend/
├── app/
│   ├── main.py
│   ├── core/          # config, JWT/hashing, logging
│   ├── db/            # SQLAlchemy engine/session
│   ├── models/         # User, Summary
│   ├── schemas/         # Pydantic schemas
│   ├── api/
│   │   ├── auth.py     # signup / login / refresh
│   │   └── summary.py  # create + list summaries
│   ├── services/llm.py  # Groq call
│   ├── deps.py
│   └── exceptions.py
├── alembic/
├── requirements.txt
├── .env.example
├── Dockerfile
└── docker-compose.yml
## Setup

```bash
python -m venv venv
venv\Scripts\activate       # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env         # fill in DATABASE_URL, SECRET_KEY, GROQ_API_KEY
alembic upgrade head
uvicorn app.main:app --reload
```

Docs: http://localhost:8000/docs

## API

All endpoints except `/auth/*` and `/health` need `Authorization: Bearer <access_token>`.

| Endpoint | Body | Returns |
|---|---|---|
| `POST /auth/signup` | `{email, password}` | user id + email |
| `POST /auth/login` | `{email, password}` | `access_token`, `refresh_token` |
| `POST /auth/refresh` | `{refresh_token}` | new token pair |
| `POST /summary/` | `{text, mode}` — mode: `brief`/`detailed`/`bullet_points` | generated summary |
| `GET /summary/?page=1&page_size=10` | — | paginated summary history |
| `GET /summary/{id}` | — | single summary |
| `GET /health` | — | `{status: "ok"}` |

Errors: `{ "detail": "message" }` — `401` bad auth · `409` email taken · `422` validation · `429` rate limited · `502` Groq failed