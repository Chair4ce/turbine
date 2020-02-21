CREATE TABLE member_import_log
(
    id                          INT NOT NULL AUTO_INCREMENT,
    sqid                        TEXT,
    full_name                   TEXT,
    import_date_time            DATETIME,
    field                       TEXT,
    old_data                    TEXT,
    new_data                    TEXT,
    PRIMARY KEY (id)
);