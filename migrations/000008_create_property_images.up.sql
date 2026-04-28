CREATE TABLE IF NOT EXISTS property_images (
    id              SERIAL PRIMARY KEY,
    property_id     INT             NOT NULL,
    image_url       VARCHAR(255)    NOT NULL,
    is_primary      BOOLEAN         NOT NULL DEFAULT FALSE,
    sort_order      INT             NOT NULL DEFAULT 0,

    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP       DEFAULT NULL,

    CONSTRAINT property_images_property_fk  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE INDEX idx_property_images_property_id    ON property_images (property_id);
CREATE INDEX idx_property_images_is_primary     ON property_images (property_id, is_primary);
CREATE INDEX idx_property_images_deleted_at     ON property_images (deleted_at);