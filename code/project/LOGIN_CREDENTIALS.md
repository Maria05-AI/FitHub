# FitHub Login Credentials

## Test Accounts

### 👤 Member Accounts

1. **Test Member (Recommended for testing)**
   - Email: `testmember@test.com`
   - Password: `password123`
   - Status: ✅ Verified working

2. **Fatimah Al-Mousa**
   - Email: `fatimah@example.com`
   - Password: (You need to know the password you set during registration)

3. **Alreem**
   - Email: `alreem6630495@gmail.com`
   - Password: (You need to know the password you set during registration)

4. **Test Member (Original)**
   - Email: `test.member@fithub.com`
   - Password: (You need to know the password you set during registration)

5. **Alreem Alsadiq**
   - Email: `Alreem1234@gmail.com`
   - Password: (You need to know the password you set during registration)

6. **Mariam**
   - Email: `asdghjk@gmail.com`
   - Password: (You need to know the password you set during registration)

### 👨‍🏫 Trainer Accounts

1. **Test Trainer (Recommended for testing)**
   - Email: `testtrainer@test.com`
   - Password: `password123`
   - Status: ✅ Available for testing

2. **Zainab Almousa**
   - Email: `zainab.almousa@fithub.com`
   - Password: (Your personal password)
   - Status: ✅ Verified as trainer

---

## How to Login

1. Go to: http://localhost:8083
2. Click "Sign In" or navigate to the auth page
3. Enter email and password
4. Click "Sign In"

### For Members:
- You will be redirected to: `/member/dashboard`
- Navigation: Dashboard, Workouts, Sessions, Progress, Profile

### For Trainers:
- You will be redirected to: `/trainer/dashboard`
- Navigation: Dashboard, Members, Sessions, Reports, Profile

---

## Creating New Test Accounts

If you want to create new test accounts:

### Register as Member:
1. Go to http://localhost:8083/auth?mode=register&role=member
2. Fill in:
   - Full Name: Your name
   - Email: your.email@example.com
   - Password: your_password
3. Click "Create Account"

### Register as Trainer:
1. Go to http://localhost:8083/auth?mode=register&role=trainer
2. Fill in:
   - Full Name: Your name
   - Email: your.email@example.com
   - Password: your_password
3. Click "Create Account"

---

## Password Reset

Currently, there is no password reset functionality. If you forget a password:
1. Use one of the test accounts above
2. Or create a new account
3. Or contact the database administrator to reset the password

---

## Quick Reference

**Best for Testing:**
- Member: `testmember@test.com` / `password123`
- Trainer: `testtrainer@test.com` / `password123`

**Your Personal Account:**
- Trainer: `zainab.almousa@fithub.com` / (your password)
