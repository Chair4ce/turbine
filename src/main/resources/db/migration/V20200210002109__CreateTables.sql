CREATE TABLE update_metric
(
    id        INT NOT NULL AUTO_INCREMENT,
    action    TEXT,
    context   TEXT,
    old_value VARCHAR(512),
    new_value VARCHAR(512),
    PRIMARY KEY (id)
);

CREATE TABLE members
(
    id                   INT NOT NULL AUTO_INCREMENT,
    sqid                 TEXT,
    full_name            TEXT,
    first_name           TEXT,
    last_name            TEXT,
    tafmsd               DATE,
    grade                TEXT,
    assigned_pas         TEXT,
    office_symbol        TEXT,
    duty_title           TEXT,
    duty_start_date      DATE,
    dafsc                TEXT,
    duty_phone           TEXT,
    supv_name            TEXT,
    supv_begin_date      DATE,
    date_arrived_station DATE,
    dor                  DATE,
    last_updated         DATE,
    PRIMARY KEY (id)
);

CREATE TABLE squadron
(
    id        INT NOT NULL AUTO_INCREMENT,
    squadron  TEXT,
    pas       TEXT,
    group_pas TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE feedback
(
    id             INT NOT NULL AUTO_INCREMENT,
    feedback_entry TEXT,
    date_time      TEXT,
    PRIMARY KEY (id)
);