from datetime import datetime, timedelta
import jwt, os

SECRET = os.getenv("JWT_SECRET", "dev-secret")
ALGO = "HS256"

def make_token(payload: dict, exp_days: int = 2) -> str:
    body = {"exp": datetime.utcnow() + timedelta(days=exp_days), **payload}
    return jwt.encode(body, SECRET, algorithm=ALGO)

def verify_token(token: str) -> dict:
    return jwt.decode(token, SECRET, algorithms=[ALGO])
