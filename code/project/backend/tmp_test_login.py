from models import SessionLocal
from models.user import User
from services.auth import verify_password

with SessionLocal() as db:
    user = db.query(User).filter(User.email=='admin@test.com').first()
    if not user:
        print('Admin user not found')
    else:
        print('Found user:', user.email, 'role=', user.role)
        print('is_active:', getattr(user, 'is_active', 'MISSING'))
        print('plan:', getattr(user, 'plan', 'MISSING'))
        print('assigned_trainer_id:', getattr(user, 'assigned_trainer_id', 'MISSING'))
        print('password verification (password123):', verify_password('password123', user.password_hash))
