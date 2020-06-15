
CREATE TABLE members
(
    id                   INT NOT NULL AUTO_INCREMENT,
    sqid                 TEXT,
    full_name            TEXT,
    first_name           TEXT,
    last_name            TEXT,
    tafmsd               DATETIME,
    grade                TEXT,
    assigned_pas         TEXT,
    office_symbol        TEXT,
    duty_title           TEXT,
    duty_start_date      DATETIME,
    dafsc                TEXT,
    duty_phone           TEXT,
    supv_name            TEXT,
    supv_begin_date      DATETIME,
    date_arrived_station DATETIME,
    dor                  DATETIME,
    last_updated         DATETIME,
    PRIMARY KEY (id)
);

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