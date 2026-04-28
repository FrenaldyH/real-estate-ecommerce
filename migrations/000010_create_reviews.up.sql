CREATE TYPE RATING ENUM (1, 2, 3, 4, 5)
CREATE TABLE
  reviews (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    rating RATING NOT NULL comment TEXT,
    created_at TIMESTAMP DEFAULT NOW (),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) ON user (id),
    CONSTRAINT fk_property_id FOREIGN KEY (property_id) ON properties (id),
    CONSTRAINT unique_property_user UNIQUE (user_id, property_id);
  )