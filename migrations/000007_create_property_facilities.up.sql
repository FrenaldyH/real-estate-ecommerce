CREATE TABLE IF NOT EXISTS property_facilities (
    id                  SERIAL PRIMARY KEY,
    property_id         INT         NOT NULL,
    facility_type_id    INT         NOT NULL,
    amount              INT         NOT NULL DEFAULT 1,

    created_at          TIMESTAMP   NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMP   DEFAULT NULL,

    CONSTRAINT property_facilities_unique           UNIQUE (property_id, facility_type_id),
    CONSTRAINT property_facilities_property_fk      FOREIGN KEY (property_id)       REFERENCES properties(id)       ON DELETE CASCADE,
    CONSTRAINT property_facilities_facility_type_fk FOREIGN KEY (facility_type_id)  REFERENCES facility_types(id)   ON DELETE RESTRICT,
    CONSTRAINT property_facilities_amount_check     CHECK (amount > 0)
);

CREATE INDEX idx_property_facilities_property_id        ON property_facilities (property_id);
CREATE INDEX idx_property_facilities_facility_type_id   ON property_facilities (facility_type_id);
CREATE INDEX idx_property_facilities_deleted_at         ON property_facilities (deleted_at);