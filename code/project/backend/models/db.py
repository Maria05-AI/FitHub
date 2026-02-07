import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()
# Default to using the backend/fithub.db file (absolute path) so scripts and
# the Flask app all connect to the same database regardless of current cwd.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB_PATH = os.path.join(os.path.dirname(BASE_DIR), "fithub.db")
env_url = os.getenv("DATABASE_URL")
if env_url:
    # If env provides a sqlite URL that is relative (e.g. sqlite:///fithub.db),
    # convert it to an absolute path anchored to the project backend directory
    if env_url.startswith("sqlite:///"):
        # extract path after sqlite:///
        rel_path = env_url.replace("sqlite:///", "")
        if not os.path.isabs(rel_path):
            abs_path = os.path.join(os.path.dirname(BASE_DIR), rel_path)
            DATABASE_URL = f"sqlite:///{abs_path}"
        else:
            DATABASE_URL = env_url
    else:
        DATABASE_URL = env_url
else:
    # Use absolute sqlite path
    DATABASE_URL = f"sqlite:///{DEFAULT_DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()
