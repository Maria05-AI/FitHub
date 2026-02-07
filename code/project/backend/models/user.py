# backend/models/user.py
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base  # مهم


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String(20), nullable=False)  # "member" | "trainer" | "admin"
    phone = Column(String(20), nullable=True)  # رقم الهاتف
    specialty = Column(String(100), nullable=True)  # تخصص المدرب
    is_active = Column(Boolean, default=True, nullable=False)  # حالة المستخدم
    plan = Column(String(50), nullable=True)  # خطة العضوية
    # status: more expressive status for admin UI (Active | Suspended | Expired)
    status = Column(String(20), default="Active", nullable=False)
    assigned_trainer_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # معرف المدرب المعين

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        onupdate=datetime.utcnow, nullable=False)

    # Relationships
    # One-to-one relationship to member/trainer profile tables (if present)
    member = relationship("Member", uselist=False, back_populates="user", cascade="all, delete-orphan")
    trainer = relationship("Trainer", uselist=False, back_populates="user", cascade="all, delete-orphan")

    # Workouts associated with this user
    workouts = relationship("Workout", back_populates="user", cascade="all, delete-orphan")

    # Self-referential relationship for assigned trainer (a User may have another User as their trainer)
    assigned_trainer = relationship(
        "User",
        remote_side=[id],
        foreign_keys=[assigned_trainer_id],
        uselist=False,
    )
