CREATE TABLE IF NOT EXISTS reviews (
    id              SERIAL PRIMARY KEY,
    user_id         INT         NOT NULL,
    property_id     INT         NOT NULL,
    rating          SMALLINT    NOT NULL,
    comment         TEXT        DEFAULT NULL,

    created_at      TIMESTAMP   NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP   DEFAULT NULL,

    CONSTRAINT reviews_unique           UNIQUE (user_id, property_id),
    CONSTRAINT reviews_user_fk          FOREIGN KEY (user_id)       REFERENCES users(id)        ON DELETE CASCADE,
    CONSTRAINT reviews_property_fk      FOREIGN KEY (property_id)   REFERENCES properties(id)   ON DELETE CASCADE,
    CONSTRAINT reviews_rating_check     CHECK (rating BETWEEN 1 AND 5)
);

CREATE INDEX idx_reviews_user_id        ON reviews (user_id);
CREATE INDEX idx_reviews_property_id    ON reviews (property_id);
CREATE INDEX idx_reviews_rating         ON reviews (rating);
CREATE INDEX idx_reviews_deleted_at     ON reviews (deleted_at);