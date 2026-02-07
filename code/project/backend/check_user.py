from models import SessionLocal
from models.user import User
from sqlalchemy import select

db = SessionLocal()

# Check for the specific user
email = "zainab.almousa@fithub.com"
user = db.scalar(select(User).where(User.email == email))

print(f"Checking user: {email}")
print("-" * 80)
if user:
    print(f"Found!")
    print(f"ID: {user.id}")
    print(f"Name: {user.full_name}")
    print(f"Email: {user.email}")
    print(f"Role: {user.role}")
else:
    print("User not found")
    print("\nAll users in database:")
    all_users = db.scalars(select(User)).all()
    for u in all_users:
        print(f"  - {u.email} (Role: {u.role})")

print("-" * 80)
db.close()
