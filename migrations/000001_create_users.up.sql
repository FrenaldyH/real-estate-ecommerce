CREATE TABLE
  users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    'password' VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    deleted_at TIMESTAMP DEFAULT NULL,
  );

-- INDEX FOR FEATURE
CREATE INDEX users_username ON users (username);

CREATE INDEX users_full_name ON users (full_name);