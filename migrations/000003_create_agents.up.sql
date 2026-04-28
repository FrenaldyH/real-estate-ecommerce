CREATE TABLE
  agents (
    id INT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    agency_id INT,
    bio_description TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW (),
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_agency_id FOREIGN KEY (agency_id) REFERENCES agencies (id)
  );

-- INDEX FK
CREATE INDEX idx_agents_user_id ON agents (user_id);

CREATE INDEX idx_agents_agency_id ON agents (agency_id);