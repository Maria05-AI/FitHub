{
                "full_name": "Zainab Almousa",
                "email": "zainab.almousa@fithub.com",
                "password_hash": generate_password_hash("password123"),
                "role": "trainer",
            },
            {
                "full_name": "Fatimah Al-Mousa",
                "email": "fatimah@example.com",
                "password_hash": generate_password_hash("password123"),
                "role": "member",
            },
            {
                "full_name": "Test Member",
                "email": "testmember@test.com",
                "password_hash": generate_password_hash("password123"),
                "role": "member",
            },
            {
                "full_name": "Test Trainer",
                "email": "testtrainer@test.com",
                "password_hash": generate_password_hash("password123"),
                "role": "trainer",
            },
            {
                "full_name": "Admin User",
                "email": "admin@test.com",
                "password_hash": generate_password_hash("password123"),
                "role": "admin",
            },
        ]
=======
        users = [
            {
                "full_name": "Zainab Almousa",
                "email": "zainab.almousa@fithub.com",
                "password_hash": generate_password_hash("password123"),
                "role": "trainer",
                "specialty": "Yoga & Wellness",
                "is_active": True,
            },
            {
                "full_name": "Fatimah Al-Mousa",
                "email": "fatimah@example.com",
                "password_hash": generate_password_hash("password123"),
                "role": "member",
                "is_active": True,
            },
            {
                "full_name": "Test Member",
                "email": "testmember@test.com",
                "password_hash": generate_password_hash("password123"),
                "role": "member",
                "is_active": True,
            },
            {
                "full_name": "Test Trainer",
                "email": "testtrainer@test.com",
                "password_hash": generate_password_hash("password123"),
                "role": "trainer",
                "specialty": "Strength Training",
                "is_active": True,
            },
            {
                "full_name": "Admin User",
                "email": "admin@test.com",
                "password_hash": generate_password_hash("password123"),
                "role": "admin",
                "is_active": True,
            },
        ]
