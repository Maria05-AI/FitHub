# backend/routes/members.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from datetime import datetime
from models import SessionLocal
from models.user import User

bp = Blueprint("members", __name__)

@bp.get("/")
def list_members():
    db = SessionLocal()
    try:
        members = db.query(User).filter(User.role == "member").all()
        return jsonify([
            {
                "id": m.id,
                "name": m.full_name,
                "email": m.email,
                "phone": m.phone or "+966 55 000 0000",
                "joined": m.created_at.strftime("%b %Y") if m.created_at else "Jan 2025",
                "attendance": 90,
                "lastActive": "Today",
                "status": "Active",
            } for m in members
        ])
    finally:
        db.close()

@bp.get("/me")
@jwt_required()
def get_my_profile():
    """Get current member's profile"""
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        user_id = int(identity)  # identity is now a string of the user ID
        
        member = db.query(User).filter(User.id == user_id, User.role == "member").first()
        if not member:
            return jsonify({"error": "Member not found"}), 404
        
        return jsonify({
            "id": member.id,
            "name": member.full_name,
            "email": member.email,
            "phone": member.phone or "",
            "joinDate": member.created_at.strftime("%B %Y") if member.created_at else "January 2025",
            "membership": "Premium",
        })
    finally:
        db.close()

@bp.put("/me")
@jwt_required()
def update_my_profile():
    """Update current member's profile"""
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        user_id = int(identity)  # identity is now a string of the user ID
        
        member = db.query(User).filter(User.id == user_id, User.role == "member").first()
        if not member:
            return jsonify({"error": "Member not found"}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if data.get("name"):
            member.full_name = data["name"]
        if data.get("email"):
            # Check if email is already taken by another user
            existing = db.query(User).filter(
                User.email == data["email"],
                User.id != user_id
            ).first()
            if existing:
                return jsonify({"error": "Email already in use"}), 400
            member.email = data["email"]
        if "phone" in data:
            member.phone = data["phone"]
        
        db.commit()
        db.refresh(member)
        
        return jsonify({
            "id": member.id,
            "name": member.full_name,
            "email": member.email,
            "phone": member.phone or "",
            "joinDate": member.created_at.strftime("%B %Y") if member.created_at else "January 2025",
            "membership": "Premium",
        })
        
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

@bp.post("/")
def create_member():
    db = SessionLocal()
    try:
        data = request.get_json()
        
        # التحقق من البيانات المطلوبة
        if not data or not data.get("name") or not data.get("email"):
            return jsonify({"error": "Name and email are required"}), 400
        
        # التحقق من عدم تكرار البريد الإلكتروني
        existing = db.query(User).filter(User.email == data["email"]).first()
        if existing:
            return jsonify({"error": "Email already exists"}), 400
        
        # إنشاء كلمة مرور افتراضية (يمكن تحسينها لاحقاً)
        default_password = "Member@123"
        password_hash = generate_password_hash(default_password)
        
        # إنشاء المستخدم الجديد
        new_member = User(
            full_name=data["name"],
            email=data["email"],
            phone=data.get("phone", ""),
            password_hash=password_hash,
            role="member"
        )
        
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        
        # إرجاع البيانات بنفس التنسيق المتوقع
        return jsonify({
            "id": new_member.id,
            "name": new_member.full_name,
            "email": new_member.email,
            "phone": new_member.phone or "",
            "joined": new_member.created_at.strftime("%b %Y"),
            "attendance": 0,
            "lastActive": "Just now",
            "status": "Active",
        }), 201
        
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
