CREATE TABLE Metric
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    action  TEXT,
    context TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE SqMember
(
    id                   INT(11) NOT NULL AUTO_INCREMENT,
    ssan                 TEXT,
    full_name            TEXT,
    grade                TEXT,
    assigned_pas         TEXT,
    office_symbol        TEXT,
    duty_title           TEXT,
    duty_start_date      TEXT,
    dafsc                TEXT,
    duty_phone           TEXT,
    supv_name            TEXT,
    supv_begin_date      TEXT,
    dor                  TEXT,
    date_arrived_station TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE Squadron
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    squadron  TEXT,
    pas TEXT,
    group_pas TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE Feedback
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    feedback_entry  TEXT,
    date_time TEXT,
    PRIMARY KEY (id)
);