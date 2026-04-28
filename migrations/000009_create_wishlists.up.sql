CREATE TABLE IF NOT EXISTS wishlists (
    id              SERIAL PRIMARY KEY,
    user_id         INT         NOT NULL,
    property_id     INT         NOT NULL,

    created_at      TIMESTAMP   NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP   DEFAULT NULL,

    CONSTRAINT wishlists_unique         UNIQUE (user_id, property_id),
    CONSTRAINT wishlists_user_fk        FOREIGN KEY (user_id)       REFERENCES users(id)        ON DELETE CASCADE,
    CONSTRAINT wishlists_property_fk    FOREIGN KEY (property_id)   REFERENCES properties(id)   ON DELETE CASCADE
);

CREATE INDEX idx_wishlists_user_id      ON wishlists (user_id);
CREATE INDEX idx_wishlists_property_id  ON wishlists (property_id);
CREATE INDEX idx_wishlists_deleted_at   ON wishlists (deleted_at);