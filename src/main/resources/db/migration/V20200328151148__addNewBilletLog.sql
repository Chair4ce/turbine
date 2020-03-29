CREATE TABLE new_billet_log
(
    id               INT NOT NULL AUTO_INCREMENT,
    pas_code         TEXT,
    pos_nr           TEXT,
    import_date_time DATETIME,
    PRIMARY KEY (id)
);