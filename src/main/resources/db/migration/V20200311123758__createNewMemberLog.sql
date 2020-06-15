CREATE TABLE new_member_log
(
    id                          INT NOT NULL AUTO_INCREMENT,
    sqid                        TEXT,
    full_name                   TEXT,
    import_date_time            DATETIME,
    PRIMARY KEY (id)
);