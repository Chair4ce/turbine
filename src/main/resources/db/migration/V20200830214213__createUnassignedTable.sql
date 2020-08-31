CREATE TABLE unassigned
(
    id           INT NOT NULL AUTO_INCREMENT,
    mbr_id       TEXT,
    full_name    TEXT,
    dafsc        TEXT,
    grade        TEXT,
    last_updated DATETIME,
    PRIMARY KEY (id)
);