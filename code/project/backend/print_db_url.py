from models import engine, SessionLocal, Base
from models.db import DATABASE_URL
print('DATABASE_URL=', DATABASE_URL)
print('Engine URL:', engine.url)
