from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import SessionLocal
from models.user import User
from werkzeug.security import generate_password_hash

bp = Blueprint("admin", __name__)


def _is_admin(db, user_id: int) -> bool:
    user = db.query(User).filter(User.id == user_id).first()
    return bool(user and user.role == "admin")


@bp.get("/users")
@jwt_required()
def list_users():
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        user_id = int(identity)
        if not _is_admin(db, user_id):
            return jsonify({"error": "forbidden"}), 403

        users = db.query(User).all()
        return jsonify([
            {
                "id": u.id,
                "name": u.full_name,
                "email": u.email,
                "phone": u.phone or "",
                "role": u.role,
                "specialty": u.specialty or "",
                "is_active": u.is_active,
                "plan": u.plan or "",
                "status": getattr(u, "status", "Active"),
                "assigned_trainer_id": u.assigned_trainer_id,
                "created_at": u.created_at.isoformat() if getattr(u, "created_at", None) else None,
            }
            for u in users
        ])
    finally:
        db.close()


@bp.get("/trainers")
@jwt_required()
def list_trainers():
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        admin_id = int(identity)
        if not _is_admin(db, admin_id):
            return jsonify({"error": "forbidden"}), 403

        trainers = db.query(User).filter(User.role == "trainer").all()
        return jsonify([
            {"id": t.id, "name": t.full_name, "email": t.email}
            for t in trainers
        ])
    finally:
        db.close()


@bp.post("/users")
@jwt_required()
def create_user():
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        admin_id = int(identity)
        if not _is_admin(db, admin_id):
            return jsonify({"error": "forbidden"}), 403

        data = request.get_json() or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        role = (data.get("role") or "member").strip().lower()
        phone = data.get("phone")
        password = data.get("password") or "password123"

        if not name or not email:
            return jsonify({"error": "name and email are required"}), 400

        if role not in ("member", "trainer", "admin"):
            return jsonify({"error": "invalid role"}), 400

        exists = db.query(User).filter(User.email == email).first()
        if exists:
            return jsonify({"error": "email already in use"}), 400

        status = (data.get("status") or "Active").strip().title()
        if status not in ("Active", "Suspended", "Expired"):
            status = "Active"

        user = User(
            full_name=name,
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
            phone=phone,
            specialty=data.get("specialty"),
            plan=data.get("plan") if role == "member" else None,
            status=status,
            assigned_trainer_id=data.get("assigned_trainer_id") if role == "member" else None,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        return jsonify({
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "phone": user.phone or "",
            "role": user.role,
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@bp.put("/users/<int:user_id>")
@jwt_required()
def update_user(user_id: int):
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        admin_id = int(identity)
        if not _is_admin(db, admin_id):
            return jsonify({"error": "forbidden"}), 403

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        data = request.get_json() or {}
        # allow updating name, email, phone, specialty, is_active, plan, status, assigned_trainer_id
        if data.get("name"):
            user.full_name = data.get("name")
        if data.get("email"):
            # ensure no duplicate
            existing = db.query(User).filter(User.email == data.get("email"), User.id != user_id).first()
            if existing:
                return jsonify({"error": "email already in use"}), 400
            user.email = data.get("email")
        if "phone" in data:
            user.phone = data.get("phone")
        if "specialty" in data:
            user.specialty = data.get("specialty")
        if "is_active" in data:
            user.is_active = bool(data.get("is_active"))
            # keep status in sync
            user.status = "Active" if user.is_active else "Suspended"
        if "status" in data:
            new_status = (data.get("status") or "").strip().title()
            if new_status in ("Active", "Suspended", "Expired"):
                user.status = new_status
                user.is_active = (new_status == "Active")
        if "plan" in data:
            user.plan = data.get("plan")
        if "assigned_trainer_id" in data:
            assigned_id = data.get("assigned_trainer_id")
            if assigned_id:
                # Verify trainer exists
                trainer = db.query(User).filter(User.id == assigned_id, User.role == "trainer").first()
                if not trainer:
                    return jsonify({"error": "invalid trainer"}), 400
            user.assigned_trainer_id = assigned_id

        db.commit()
        db.refresh(user)

        return jsonify({
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "phone": user.phone or "",
            "role": user.role,
            "specialty": user.specialty or "",
            "is_active": user.is_active,
            "plan": user.plan or "",
            "status": user.status,
            "assigned_trainer_id": user.assigned_trainer_id,
        })
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@bp.patch("/users/<int:user_id>/status")
@jwt_required()
def toggle_status(user_id: int):
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        admin_id = int(identity)
        if not _is_admin(db, admin_id):
            return jsonify({"error": "forbidden"}), 403

        print(f"[DEBUG] Received PATCH /api/admin/users/{user_id}/status from admin {admin_id}")

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        # Toggle the status between Active <-> Suspended (Expired remains Suspended when toggled)
        current = (user.status or "").title()
        if current == "Active":
            new_status = "Suspended"
        elif current == "Suspended":
            new_status = "Active"
        else:
            # If Expired or unknown, set to Suspended
            new_status = "Suspended"

        user.status = new_status
        user.is_active = (new_status == "Active")
        db.commit()
        db.refresh(user)

        return jsonify({
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "phone": user.phone or "",
            "role": user.role,
            "specialty": user.specialty or "",
            "is_active": user.is_active,
            "plan": user.plan or "",
            "status": user.status,
            "assigned_trainer_id": user.assigned_trainer_id,
        })
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@bp.put("/users/<int:user_id>/role")
@jwt_required()
def change_role(user_id: int):
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        admin_id = int(identity)
        if not _is_admin(db, admin_id):
            return jsonify({"error": "forbidden"}), 403

        data = request.get_json() or {}
        new_role = (data.get("role") or "").strip().lower()
        if new_role not in ("member", "trainer", "admin"):
            return jsonify({"error": "invalid role"}), 400

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        user.role = new_role
        db.commit()
        db.refresh(user)

        return jsonify({"ok": True, "id": user.id, "role": user.role})
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@bp.delete("/users/<int:user_id>")
@jwt_required()
def delete_user(user_id: int):
    db = SessionLocal()
    try:
        identity = get_jwt_identity()
        admin_id = int(identity)
        if not _is_admin(db, admin_id):
            return jsonify({"error": "forbidden"}), 403

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        db.delete(user)
        db.commit()
        return jsonify({"ok": True, "id": user_id})
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
