CREATE TABLE IF NOT EXISTS agencies (
    id              SERIAL PRIMARY KEY,
    agency_name     VARCHAR(100)    NOT NULL,
    address         VARCHAR(255)    NOT NULL,
    phone_number    VARCHAR(20)     NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    nib             VARCHAR(255)    NOT NULL,

    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP       DEFAULT NULL,

    CONSTRAINT agencies_name_unique     UNIQUE (agency_name),
    CONSTRAINT agencies_email_unique    UNIQUE (email),
    CONSTRAINT agencies_nib_unique      UNIQUE (nib)
);

CREATE INDEX idx_agencies_deleted_at ON agencies (deleted_at);