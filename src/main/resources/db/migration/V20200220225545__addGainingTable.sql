CREATE TABLE gaining
(
    id                          INT NOT NULL AUTO_INCREMENT,
    sqid                        TEXT,
    full_name                   TEXT,
    first_name                  TEXT,
    last_name                   TEXT,
    rnltd                       DATETIME,
    grade                       TEXT,
    gaining_pas                 TEXT,
    projected_arrival_date      DATETIME,
    dafsc                       TEXT,
    cell_phone                  TEXT,
    email                       TEXT,
    dor                         DATETIME,
    date_arrived_station        DATETIME,
    projected_billet_id         TEXT,
    departed_last_station       DATETIME,
    losing_pas                  TEXT,
    projected_office_symbol     TEXT,
    last_updated                DATETIME,
    PRIMARY KEY (id)
);