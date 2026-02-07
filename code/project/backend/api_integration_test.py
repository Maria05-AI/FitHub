from app import create_app
import json

app = create_app()
client = app.test_client()

# Login as admin
resp = client.post('/api/auth/login', json={"email": "admin@test.com", "password": "password123"})
print('login status', resp.status_code, resp.get_json())
if resp.status_code != 200:
    raise SystemExit('login failed')

token = resp.get_json().get('token')
headers = {'Authorization': f'Bearer {token}'}

# Fetch users
resp = client.get('/api/admin/users', headers=headers)
print('\nGET /api/admin/users ->', resp.status_code)
users = resp.get_json()
print('users count:', len(users))

# Find sample member and trainer
member = next((u for u in users if u['email'] == 'testmember@test.com'), None)
trainer = next((u for u in users if u['email'] == 'testtrainer@test.com'), None)
print('member', member)
print('trainer', trainer)

if not member:
    raise SystemExit('member not found')

member_id = member['id']
trainer_id = trainer['id'] if trainer else None

# Update member: change plan and status and assigned_trainer_id
payload = {
    'plan': 'Premium',
    'status': 'Expired',
    'assigned_trainer_id': trainer_id
}
resp = client.put(f'/api/admin/users/{member_id}', headers=headers, json=payload)
print('\nPUT update member ->', resp.status_code, resp.get_json())

# Re-fetch users and check changes
resp = client.get('/api/admin/users', headers=headers)
users = resp.get_json()
member2 = next((u for u in users if u['id'] == member_id), None)
print('\nAfter update member', member2)

# Toggle status via PATCH
resp = client.patch(f'/api/admin/users/{member_id}/status', headers=headers)
print('\nPATCH toggle status ->', resp.status_code, resp.get_json())

# Final fetch
resp = client.get('/api/admin/users', headers=headers)
member3 = next((u for u in resp.get_json() if u['id'] == member_id), None)
print('\nFinal member state', member3)

print('\nTest complete')
