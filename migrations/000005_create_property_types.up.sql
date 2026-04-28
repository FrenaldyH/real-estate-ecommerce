CREATE TABLE
  IF NOT EXISTS property_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW (),
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT property_types_name_unique UNIQUE (name)
  );

CREATE INDEX idx_property_types_deleted_at ON property_types (deleted_at);

-- Seed default property types
INSERT INTO
  property_types (name)
VALUES
  ('Rumah'),
  ('Apartemen'),
  ('Ruko'),
  ('Tanah'),
  ('Gudang'),
  ('Villa'),
  ('Kost'),
  ('Kantor');