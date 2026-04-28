CREATE TABLE IF NOT EXISTS agents (
    id                      SERIAL PRIMARY KEY,
    user_id                 INT             NOT NULL,
    bio_description         TEXT            DEFAULT NULL,
    agency_id               INT             DEFAULT NULL,
    total_properties_sold   INT             NOT NULL DEFAULT 0,

    created_at              TIMESTAMP       NOT NULL DEFAULT NOW(),
    deleted_at              TIMESTAMP       DEFAULT NULL,

    CONSTRAINT agents_user_id_unique    UNIQUE (user_id),
    CONSTRAINT agents_user_id_fk        FOREIGN KEY (user_id)   REFERENCES users(id)    ON DELETE CASCADE,
    CONSTRAINT agents_agency_id_fk      FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE SET NULL,
    CONSTRAINT agents_total_sold_check  CHECK (total_properties_sold >= 0)
);

CREATE INDEX idx_agents_user_id     ON agents (user_id);
CREATE INDEX idx_agents_agency_id   ON agents (agency_id);
CREATE INDEX idx_agents_deleted_at  ON agents (deleted_at);