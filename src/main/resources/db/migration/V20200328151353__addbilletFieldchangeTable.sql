CREATE TABLE billet_import_log
(
    id                          INT NOT NULL AUTO_INCREMENT,
    pas_code                    TEXT,
    pos_nr                      TEXT,
    import_date_time            DATETIME,
    field                       TEXT,
    old_data                    TEXT,
    new_data                    TEXT,
    PRIMARY KEY (id)
);