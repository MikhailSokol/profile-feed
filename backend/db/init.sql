-- Создаём таблицу "user", если её ещё нет
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    email TEXT,
    "birthDay" TEXT,
    phone TEXT,
    bio TEXT,
    avatar TEXT
);

-- Вставляем тестового пользователя
INSERT INTO "user" 
    (id, "firstName", "lastName", email, "birthDay", phone, bio, avatar)
VALUES
    (1, 'First name', 'Last name', NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;