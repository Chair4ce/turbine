CREATE TABLE increment_log
(
    id               INT NOT NULL AUTO_INCREMENT,
    pas_code        TEXT,
    mbr_id          TEXT,
    afsc             TEXT,
    increment_date   DATETIME,
    increment_change double,
    increment_type   TEXT,
    PRIMARY KEY (id)
);