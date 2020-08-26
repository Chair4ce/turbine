CREATE TABLE position_assignment
(
    id               INT NOT NULL AUTO_INCREMENT,
    pas_code         TEXT,
    org_structure_id TEXT,
    afsc_auth        TEXT,
    grd_auth         TEXT,
    PRIMARY KEY (id)
);