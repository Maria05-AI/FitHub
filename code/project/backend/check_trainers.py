from models import SessionLocal
from models.user import User
from sqlalchemy import select

db = SessionLocal()
trainers = db.scalars(select(User).where(User.role == 'trainer')).all()

print("Trainers in database:")
print("-" * 80)
if trainers:
    for t in trainers:
        print(f"ID: {t.id}, Name: {t.full_name}, Email: {t.email}, Role: {t.role}")
else:
    print("No trainers found in database")
print("-" * 80)

db.close()
