CREATE TABLE IF NOT EXISTS facility_types (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50)     NOT NULL,

    created_at  TIMESTAMP       NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMP       DEFAULT NULL,

    CONSTRAINT facility_types_name_unique UNIQUE (name)
);

CREATE INDEX idx_facility_types_deleted_at ON facility_types (deleted_at);

-- Seed common facility types
INSERT INTO facility_types (name) VALUES
    ('Kamar Tidur'),
    ('Kamar Mandi'),
    ('Garasi'),
    ('Carport'),
    ('Kolam Renang'),
    ('Dapur'),
    ('Ruang Tamu'),
    ('Ruang Makan'),
    ('Taman'),
    ('Balkon');