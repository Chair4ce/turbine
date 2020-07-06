CREATE TABLE members
(
    id                   INT NOT NULL AUTO_INCREMENT,
    full_name            TEXT,
    grade                TEXT,
    assigned_pas         TEXT,
    dafsc                TEXT,
    office_symbol        TEXT,
    duty_title           TEXT,
    duty_start_date      DATETIME,
    duty_phone           TEXT,
    supv_name            TEXT,
    supv_begin_date      DATETIME,
    date_arrived_station DATETIME,
    rnltd                DATETIME,
    dor                  DATETIME,
    last_updated         DATETIME,
    PRIMARY KEY (id)
);



