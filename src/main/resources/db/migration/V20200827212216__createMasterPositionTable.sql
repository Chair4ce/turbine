CREATE TABLE position_master
(
    id            INT NOT NULL AUTO_INCREMENT,
    pas_code      TEXT,
    pos_nr        TEXT,
    org_struct_id TEXT,
    afsc_auth     INT,
    grade_auth    INT,
    curr_qtr      TEXT,
    proj_qtr1     TEXT,
    proj_qtr2     TEXT,
    proj_qtr3     TEXT,
    proj_qtr4     TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE member_assignments
(
    id     INT NOT NULL AUTO_INCREMENT,
    pos_id INT,
    mbr_id INT,
    type   TEXT,
    proj_depart_month INT,
    proj_depart_year INT,
    PRIMARY KEY (id)
);
