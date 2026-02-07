import os
import sqlite3

"""Migration: ensure users table has is_active, plan, assigned_trainer_id columns

This script will add the columns if they don't already exist. It connects to
backend/fithub.db using an absolute path so it's safe to run from the project
root or anywhere.
"""


def get_db_path():
    # Ensure we target the backend/fithub.db file (same DB the app uses)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, 'fithub.db')


def ensure_columns():
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute("PRAGMA table_info(users)")
        columns = [c[1] for c in cursor.fetchall()]

        if 'is_active' not in columns:
            print('Adding is_active column...')
            cursor.execute("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1")

        if 'plan' not in columns:
            print('Adding plan column...')
            cursor.execute("ALTER TABLE users ADD COLUMN plan VARCHAR(50)")

        if 'assigned_trainer_id' not in columns:
            print('Adding assigned_trainer_id column...')
            cursor.execute("ALTER TABLE users ADD COLUMN assigned_trainer_id INTEGER")

        conn.commit()
        print('✅ Migration complete')
    except Exception as e:
        print('❌ Migration failed:', e)
        conn.rollback()
    finally:
        conn.close()


if __name__ == '__main__':
    ensure_columns()
