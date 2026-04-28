CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    nik             CHAR(16)        NOT NULL,
    username        VARCHAR(50)     NOT NULL,
    full_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    phone_number    VARCHAR(20)     NOT NULL,
    password        VARCHAR(255)    NOT NULL,
    role            VARCHAR(10)     NOT NULL DEFAULT 'user',

    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP       DEFAULT NULL,

    CONSTRAINT users_nik_unique         UNIQUE (nik),
    CONSTRAINT users_username_unique    UNIQUE (username),
    CONSTRAINT users_email_unique       UNIQUE (email),
    CONSTRAINT users_role_check         CHECK (role IN ('user', 'agent', 'admin'))
);

CREATE INDEX idx_users_deleted_at ON users (deleted_at);