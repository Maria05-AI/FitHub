# backend/app.py
from flask import Flask, app, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

from routes import register_routes
from models import Base, engine

load_dotenv()

def create_app() -> Flask:
    app = Flask(__name__)

    # ===== App Config =====
    # مفتاح JWT (غيّريه في .env:  JWT_SECRET=قيمة_سرية_طويلة)
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "change-me")
    # تعطيل ترتيب مفاتيح JSON تلقائياً (اختياري)
    app.config["JSON_SORT_KEYS"] = False
    # Allow JWT identity to be a dict/JSON object
    app.config["JWT_JSON_KEY"] = "sub"
    app.config["JWT_IDENTITY_CLAIM"] = "sub"

    
    # ===== CORS =====
    CORS(app,
         origins=["http://localhost:*", "http://127.0.0.1:*", "http://localhost:8080", "http://127.0.0.1:8080"],
         supports_credentials=True,
            allow_headers=["Content-Type", "Authorization"],
            methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])


    # ===== JWT =====
    JWTManager(app)

    # ===== DB =====
    # إنشاء الجداول لو ما كانت موجودة
    Base.metadata.create_all(bind=engine)

    # ===== Health Check =====
    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    # ===== Register Blueprints (/api/...) =====
    register_routes(app)

    # ===== Error Handlers (اختياري لكنه مفيد أثناء التطوير) =====
    @app.errorhandler(404)
    def not_found(_):
        return jsonify({"error": "not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "server error", "detail": str(e)}), 500

    return app


app = create_app()

if __name__ == "__main__":
    # شغّلي الباك على 0.0.0.0:5000
    # Disable the reloader/watchdog in the development server so the process
    # stays bound to the port reliably in this environment.
        host = "127.0.0.1"
        port = 5000
        try:
            from wsgiref.simple_server import make_server, WSGIRequestHandler

            print(f"Starting WSGI server on http://{host}:{port}")
            with make_server(host, port, app, handler_class=WSGIRequestHandler) as httpd:
                httpd.serve_forever()
        except Exception as e:
            print("WSGI server failed, falling back to Flask dev server:", e)
            app.run(host="0.0.0.0", port=port, debug=False, use_reloader=False)
