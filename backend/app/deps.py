import uuid

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.session import get_db
from app.exceptions import InvalidTokenError
from app.models.user import User

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    try:
        payload = decode_token(token)
    except JWTError:
        raise InvalidTokenError("Invalid or expired token")

    if payload.get("type") != "access":
        raise InvalidTokenError("Expected an access token")

    user_id = payload.get("sub")
    if not user_id:
        raise InvalidTokenError("Token missing subject")

    user = db.get(User, uuid.UUID(user_id))
    if not user:
        raise InvalidTokenError("User no longer exists")

    return user
