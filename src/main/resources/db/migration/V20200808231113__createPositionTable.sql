CREATE TABLE position
(
    id                   INT NOT NULL AUTO_INCREMENT,
    pas_code            TEXT,
    org_structure_id    TEXT,
    afsc_auth           TEXT,
    grd_auth            TEXT,
    curr_qtr            TEXT,
    proj_qtr_1          TEXT,
    proj_qtr_2          TEXT,
    proj_qtr_3          TEXT,
    proj_qtr_4          TEXT,
    pos_nr              TEXT,
    assigned_mbr_id     TEXT,
    mbr_name            TEXT,
    last_updated        DATETIME,
    PRIMARY KEY (id)
);