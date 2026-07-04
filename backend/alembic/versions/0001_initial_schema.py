from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    summary_mode_enum = postgresql.ENUM(
        "brief", "detailed", "bullet_points", name="summary_mode"
    )
    summary_mode_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "summaries",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("original_text", sa.Text(), nullable=False),
        sa.Column(
            "mode",
            postgresql.ENUM(
                "brief", "detailed", "bullet_points", name="summary_mode", create_type=False
            ),
            nullable=False,
        ),
        sa.Column("summary_text", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_summaries_user_id", "summaries", ["user_id"])
    op.create_index("ix_summaries_created_at", "summaries", ["created_at"])


def downgrade() -> None:
    op.drop_index("ix_summaries_created_at", table_name="summaries")
    op.drop_index("ix_summaries_user_id", table_name="summaries")
    op.drop_table("summaries")