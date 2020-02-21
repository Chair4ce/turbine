CREATE TABLE gaining
(
    id                          INT NOT NULL AUTO_INCREMENT,
    sqid                        TEXT,
    full_name                   TEXT,
    first_name                  TEXT,
    last_name                   TEXT,
    rnltd                       DATE,
    grade                       TEXT,
    gaining_pas                 TEXT,
    projected_arrival_date      DATE,
    dafsc                       TEXT,
    cell_phone                  TEXT,
    email                       TEXT,
    dor                         DATE,
    date_arrived_station        DATE,
    projected_billet_id         TEXT,
    departed_last_station       DATE,
    losing_pas                  TEXT,
    projected_office_symbol     TEXT,
    last_updated                DATE,
    PRIMARY KEY (id)
);