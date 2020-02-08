
CREATE TABLE members
(
    id              INT(11) NOT NULL AUTO_INCREMENT,
    full_name       TEXT,
    grade           TEXT,
    assigned_pas    TEXT,
    office_symbol   TEXT,
    duty_title      TEXT,
    duty_start_date TEXT,
    dafsc           TEXT,
    duty_phone      TEXT,
    awardec_status  TEXT,
    epr_opr_status  TEXT,
    primary key (id)
);
