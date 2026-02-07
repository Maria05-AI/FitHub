import os, sqlite3
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'fithub.db')
print('DB_PATH=', DB_PATH)
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()
cursor.execute('PRAGMA table_info(users)')
cols = cursor.fetchall()
print('columns:')
for c in cols:
    print(c)
conn.close()
