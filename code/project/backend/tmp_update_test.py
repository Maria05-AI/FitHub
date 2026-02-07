from models import SessionLocal
from models.user import User

with SessionLocal() as db:
    member = db.query(User).filter(User.email=='testmember@test.com').first()
    trainer = db.query(User).filter(User.email=='testtrainer@test.com').first()
    print('Before:', member.plan, member.assigned_trainer_id)
    member.plan = 'Gold'
    member.assigned_trainer_id = trainer.id if trainer else None
    db.commit()
    db.refresh(member)
    print('After:', member.plan, member.assigned_trainer_id)
