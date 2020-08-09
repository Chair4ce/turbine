CREATE TABLE position
(
    id                   INT NOT NULL AUTO_INCREMENT,
    pas_code            TEXT,
    org_structure_id    TEXT,
    afsc_auth           TEXT,
    grd_auth            TEXT,
    curr_qtr            BOOL,
    proj_qtr_1          BOOL,
    proj_qtr_2          BOOL,
    proj_qtr_3          BOOL,
    proj_qtr_4          BOOL,
    pos_nr              TEXT,
    assigned_mbr_id     TEXT,
    pos_type            TEXT,
    last_Updated        DATETIME,
    PRIMARY KEY (id)
);