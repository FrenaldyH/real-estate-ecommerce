CREATE TYPE PROPERTY_STATUS AS ENUM ('available', 'sold');

CREATE TYPE LISTING_TYPE AS ENUM ('sale', 'rent', 'lease');

CREATE TABLE
  properties (
    id INT PRIMARY KEY,
    type_id INT NOT NULL,
    agent_id INT NOT NULL,
    NOP_PBB CHAR(18) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    price DECIMAL(17, 2) NOT NULL,
    'address' VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    listing_type LISTING_TYPE NOT NULL,
    'status' PROPERTY_STATUS DEFAULT 'available',
    created_at TIMESTAMP DEFAULT NOW (),
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_properties_type FOREIGN KEY (type_id) REFERENCES property_types (id) ON DELETE CASCADE,
    CONSTRAINT fk_properties_agent FOREIGN KEY (agent_id) REFERENCES agents (id) ON DELETE CASCADE
  );

-- INDEX FK
CREATE INDEX idx_properties_agent_id ON properties (agent_id);

CREATE INDEX idx_properties_type_id ON properties (type_id);

-- INDEX FOR FILTERING
CREATE INDEX idx_properties_province ON properties (province);

CREATE INDEX idx_properties_city ON properties (city);

CREATE INDEX idx_properties_listing_type ON properties (listing_type);

CREATE INDEX idx_properties_price ON properties (price);