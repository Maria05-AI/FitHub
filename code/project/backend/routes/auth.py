 # backend/routes/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from sqlalchemy import select

from models import SessionLocal          # من models/__init__.py
from models.user import User             # نموذج المستخدم
from services.auth import hash_password, verify_password

bp = Blueprint("auth", __name__)

@bp.post("/register")
def register():
    data = request.get_json() or {}
    full_name = (data.get("fullName") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    role = (data.get("role") or "member").strip().lower()   # "member" | "trainer"

    if not full_name or not email or not password:
        return jsonify({"error": "missing fields"}), 400
    if role not in ("member", "trainer"):
        return jsonify({"error": "invalid role"}), 400

    with SessionLocal() as db:
        # تحقّق من الإيميل الفريد
        exists = db.scalar(select(User).where(User.email == email))
        if exists:
            return jsonify({"error": "email already registered"}), 409

        # إنشاء المستخدم
        user = User(
            full_name=full_name,
            email=email,
            password_hash=hash_password(password),
            role=role,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # إنشاء توكن JWT - store user ID as string
        token = create_access_token(identity=str(user.id))

        return jsonify({
            "ok": True,
            "token": token,
            "role": user.role,
            "user": {
                "id": user.id,
                "fullName": user.full_name,
                "email": user.email,
                "role": user.role,
            },
        }), 201


@bp.post("/login")
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    if not email or not password:
        return jsonify({"error": "missing fields"}), 400

    with SessionLocal() as db:
        user = db.scalar(select(User).where(User.email == email))
        if not user or not verify_password(password, user.password_hash):
            return jsonify({"error": "invalid credentials"}), 401

        token = create_access_token(identity=str(user.id))

        return jsonify({
            "ok": True,
            "token": token,
            "role": user.role,
            "user": {
                "id": user.id,
                "fullName": user.full_name,
                "email": user.email,
                "role": user.role,
            },
        })
