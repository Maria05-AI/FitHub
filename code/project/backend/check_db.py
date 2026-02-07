import os
import sqlite3

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(os.path.dirname(BASE_DIR), 'fithub.db')

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()
cursor.execute('SELECT id, full_name, email, phone, role FROM users WHERE role="member"')

print('\nMembers in database:')
print('-' * 80)
for row in cursor.fetchall():
    print(f'ID: {row[0]}, Name: {row[1]}, Email: {row[2]}, Phone: {row[3]}, Role: {row[4]}')
print('-' * 80)

conn.close()
