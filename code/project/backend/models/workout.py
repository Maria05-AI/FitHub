# backend/models/workout.py
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float, Text
from sqlalchemy.orm import relationship
from . import Base

class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # جدول users موجود لديك
    date = Column(Date, nullable=False)                 # تاريخ التمرين
    wtype = Column(String(80), nullable=False)          # نوع التمرين (Cardio/Strength/HIIT/...)
    duration_min = Column(Integer, nullable=False)      # المدة بالدقائق
    calories = Column(Float, nullable=True)             # السعرات (اختياري)
    notes = Column(Text, nullable=True)                 # ملاحظات (اختياري)

    user = relationship("User", back_populates="workouts")
