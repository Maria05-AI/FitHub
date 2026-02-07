import os
import sqlite3

"""Migration: ensure users table has status column

Adds a `status` VARCHAR column defaulting to 'Active' to support
Active/Suspended/Expired states used by admin UI. Safe to run multiple times.
"""


def get_db_path():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, 'fithub.db')


def ensure_status_column():
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute("PRAGMA table_info(users)")
        columns = [c[1] for c in cursor.fetchall()]

        if 'status' not in columns:
            print('Adding status column...')
            cursor.execute("ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'Active'")
        else:
            print('Status column already exists')

        conn.commit()
        print('✅ Migration complete')
    except Exception as e:
        print('❌ Migration failed:', e)
        conn.rollback()
    finally:
        conn.close()


if __name__ == '__main__':
    ensure_status_column()
