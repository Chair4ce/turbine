CREATE TABLE gaining_member
(
    id                   INT NOT NULL AUTO_INCREMENT,
    mbr_id               TEXT,
    full_name            TEXT,
    grade                TEXT,
    losing_pas           TEXT,
    losing_pas_cleartext TEXT,
    dafsc                TEXT,
    sponsor_id           TEXT,
    dor                  DATETIME,
    dos                  DATETIME,
    rnltd                DATETIME,
    last_updated         DATETIME,
        PRIMARY KEY (id)
);