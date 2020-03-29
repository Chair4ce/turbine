CREATE TABLE authorized_positions
(
    id             INT NOT NULL AUTO_INCREMENT,
    pas_code       TEXT,
    orgn_struct_id TEXT,
    pos_nr         TEXT,
    afsc_auth      TEXT,
    grd_auth       TEXT,
    curr_qtr       TEXT,
    proj_qtr1      TEXT,
    proj_qtr2      TEXT,
    proj_qtr3      TEXT,
    proj_qtr4      TEXT,
    mbr_assigned   TEXT,
    last_update    DATETIME,
    PRIMARY KEY (id)
);