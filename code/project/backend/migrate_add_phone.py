# backend/migrate_add_phone.py
import os
import sqlite3

def get_db_path():
    # Ensure we target the backend/fithub.db file (same DB the app uses)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, 'fithub.db')


def add_phone_column():
    """Add phone column to users table if it doesn't exist"""
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if phone column exists
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'phone' not in columns:
            print("Adding phone column to users table...")
            cursor.execute("ALTER TABLE users ADD COLUMN phone VARCHAR(20)")
            conn.commit()
            print("✅ Phone column added successfully!")
        else:
            print("✅ Phone column already exists!")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    add_phone_column()
