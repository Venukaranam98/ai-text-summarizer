# AI Text Summarizer

An AI-powered web application that generates concise summaries from long text using Large Language Models (LLMs).

## Features

- Summarize long text instantly
- Choose summary style: brief, detailed, or bullet points
- User authentication (signup/login)
- View history of past summaries
- Simple and responsive UI

## Tech Stack

- React
- FastAPI
- Python
- PostgreSQL (Neon)
- Docker
- Groq API

## Project Structure
ai-text-summarizer/
├── backend/ # FastAPI + PostgreSQL + Groq
└── frontend/ # React UI
## Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env         # fill in DATABASE_URL, SECRET_KEY, GROQ_API_KEY
alembic upgrade head
uvicorn app.main:app --reload
```
API docs: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
