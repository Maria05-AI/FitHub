 # backend/routes/__init__.py
from flask import Blueprint, jsonify
from .auth import bp as auth_bp
from .members import bp as members_bp
from .trainers import bp as trainers_bp
from .admin import bp as admin_bp

def register_routes(app):
    api = Blueprint("api", __name__, url_prefix="/api")

    # ✅ Health check داخل /api
    @api.get("/health")
    def api_health():
        return jsonify({"ok": True, "service": "fithub-backend"})

    api.register_blueprint(auth_bp, url_prefix="/auth")
    api.register_blueprint(members_bp, url_prefix="/members")
    api.register_blueprint(trainers_bp, url_prefix="/trainers")
    api.register_blueprint(admin_bp, url_prefix="/admin")
    app.register_blueprint(api)
