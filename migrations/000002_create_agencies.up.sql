CREATE TABLE
  agencies (
    id INT PRIMARY KEY,
    agency_name VARCHAR(100) NOT NULL UNIQUE,
    'address' VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW (),
    delete_at TIMESTAMP DEFAULT NULL
  );