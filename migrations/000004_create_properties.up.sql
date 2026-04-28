CREATE TABLE IF NOT EXISTS properties (
    id                  SERIAL PRIMARY KEY,
    agent_id            INT             NOT NULL,
    property_type_id    INT             NOT NULL,

    title               VARCHAR(255)    NOT NULL,
    description         TEXT            NOT NULL,

    price               DECIMAL(17, 2)  NOT NULL,
    address             VARCHAR(255)    NOT NULL,
    city                VARCHAR(100)    NOT NULL,
    province            VARCHAR(100)    NOT NULL,

    listing_type        VARCHAR(20)     NOT NULL,
    status              VARCHAR(20)     NOT NULL DEFAULT 'available',
    payment_method      VARCHAR(20)     NOT NULL,
    is_negotiable       BOOLEAN         NOT NULL DEFAULT FALSE,

    facing_direction    VARCHAR(20)     DEFAULT NULL,
    has_car_access      BOOLEAN         NOT NULL DEFAULT FALSE,
    electrical_power    INT             NOT NULL DEFAULT 0,

    noppbb              CHAR(18)        NOT NULL,
    imb_pbb             BOOLEAN         NOT NULL DEFAULT FALSE,

    created_at          TIMESTAMP       NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMP       DEFAULT NULL,

    CONSTRAINT properties_noppbb_unique         UNIQUE (noppbb),
    CONSTRAINT properties_agent_id_fk           FOREIGN KEY (agent_id)          REFERENCES agents(id)           ON DELETE RESTRICT,
    CONSTRAINT properties_property_type_id_fk   FOREIGN KEY (property_type_id)  REFERENCES property_types(id)   ON DELETE RESTRICT,
    CONSTRAINT properties_listing_type_check    CHECK (listing_type     IN ('dijual', 'disewa')),
    CONSTRAINT properties_status_check          CHECK (status           IN ('available', 'sold', 'rented', 'inactive')),
    CONSTRAINT properties_payment_check         CHECK (payment_method   IN ('cash', 'kpr', 'cash_bertahap', 'all')),
    CONSTRAINT properties_price_check           CHECK (price > 0),
    CONSTRAINT properties_electrical_check      CHECK (electrical_power >= 0)
);

CREATE INDEX idx_properties_agent_id            ON properties (agent_id);
CREATE INDEX idx_properties_property_type_id    ON properties (property_type_id);
CREATE INDEX idx_properties_city                ON properties (city);
CREATE INDEX idx_properties_province            ON properties (province);
CREATE INDEX idx_properties_listing_type        ON properties (listing_type);
CREATE INDEX idx_properties_status              ON properties (status);
CREATE INDEX idx_properties_price               ON properties (price);
CREATE INDEX idx_properties_deleted_at          ON properties (deleted_at);