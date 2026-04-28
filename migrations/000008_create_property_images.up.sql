CREATE TABLE
  property_images (
    id INT PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    create_at TIMESTAMP DEFAULT NOW (),
    CONSTRAINT fk_propertiy_id FOREIGN KEY property_id ON properties (id),
  );

-- INDEX FK
CREATE INDEX idx_property_id ON property_images (property_id);