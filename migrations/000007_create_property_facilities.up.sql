CREATE TABLE
  property_facilities (
    id INT PRIMARY KEY,
    property_id INT NOT NULL,
    facility_type_id INT NOT NULL,
    CONSTRAINT fk_property_id FOREIGN KEY (property_id) REFERENCES properties (id),
    CONSTRAINT fk_facility_type_id FOREIGN KEY (facility_type_id) REFERENCES facility_type (id),
    CONSTRAINT unique_property_facility UNIQUE (property_id, facility_type_id),
  );

-- INDEX FK
CREATE INDEX idx_property_facility_property_id ON property_facilities (property_id);

CREATE INDEX idx_property_facility_facility_type_id ON property_facilities (facility_type_id);