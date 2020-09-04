CREATE TABLE double_billeted
(
    id           INT NOT NULL AUTO_INCREMENT,
    pas_code         TEXT,
    pos_nr           TEXT,
    name_assigned     TEXT,
    mbr_id_assigned    TEXT,
    last_updated     DATETIME,
    PRIMARY KEY (id)
);