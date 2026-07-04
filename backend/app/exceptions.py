class AppException(Exception):
    """Base exception for domain-level errors, carries an HTTP status code."""

    status_code: int = 400

    def __init__(self, detail: str):
        self.detail = detail
        super().__init__(detail)


class EmailAlreadyRegisteredError(AppException):
    status_code = 409


class InvalidCredentialsError(AppException):
    status_code = 401


class InvalidTokenError(AppException):
    status_code = 401


class SummaryGenerationError(AppException):
    status_code = 502
