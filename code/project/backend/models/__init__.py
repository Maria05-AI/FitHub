"""backend/models/__init__.py

Expose a single source of truth for the DB engine, SessionLocal and Base.
This module imports those objects from .db so the configuration (and the
DATABASE_URL) is defined in one place. It also imports the ORM models so
they are registered with the Base.metadata when the package is imported.
"""
from .db import engine, SessionLocal, Base

# Import models so SQLAlchemy knows about them when create_all() is called.
# Keep imports here to ensure models are registered on the shared Base.
from .user import User
from .member import Member
from .trainer import Trainer
from .workout import Workout

__all__ = ["engine", "SessionLocal", "Base", "User", "Member", "Trainer", "Workout"]
