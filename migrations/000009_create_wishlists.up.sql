CREATE TABLE
  wishlists (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) ON users (id),
    CONSTRAINT fk_property_id FOREIGN KEY (property_id) ON properties (id),
    CONSTRAINT unique_property_id_user_id UNIQUE (user_id, property_id),
  );

-- INDEX FK
CREATE INDEX idx_user_id ON wishlists (user_id);

CREATE INDEX idx_property_id ON wishlist (property_id);