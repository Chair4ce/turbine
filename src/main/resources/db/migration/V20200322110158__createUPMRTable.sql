CREATE TABLE authorized_positions
(
    id           INT NOT NULL AUTO_INCREMENT,
    squadron_id  INTEGER,
    pos_nr       TEXT,
    afsc_auth    TEXT,
    grd_auth     TEXT,
    curr_qtr     INTEGER,
    proj_qtr1    INTEGER,
    proj_qtr2    INTEGER,
    proj_qtr3    INTEGER,
    proj_qtr4    INTEGER,
    mbr_assigned TEXT,
    last_update DATETIME,
    PRIMARY KEY (id)
);