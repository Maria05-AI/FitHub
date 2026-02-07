import json
import urllib.request

BASE = 'http://127.0.0.1:5000'

# Login
login_data = json.dumps({"email": "admin@test.com", "password": "password123"}).encode('utf-8')
req = urllib.request.Request(BASE + '/api/auth/login', data=login_data, headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req) as resp:
    body = resp.read().decode('utf-8')
    print('login response:', body)
    data = json.loads(body)
    token = data.get('token')

# Call admin users
if token:
    req2 = urllib.request.Request(BASE + '/api/admin/users', headers={'Authorization': f'Bearer {token}'}, method='GET')
    with urllib.request.urlopen(req2) as r2:
        print('admin users response:', r2.read().decode('utf-8'))
else:
    print('No token received')
