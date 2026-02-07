from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from . import Base

class Trainer(Base):
    __tablename__ = "trainers"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    phone = Column(String)
    specialization = Column(String)
    certification = Column(String)
    since = Column(String)

    user = relationship("User", back_populates="trainer")
