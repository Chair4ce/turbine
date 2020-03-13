CREATE TABLE squadron_member_task
(
    id                          INT NOT NULL AUTO_INCREMENT,
    mbr_id                       TEXT,
    task_type                   TEXT,
    status                      TEXT,
    due_date                    DATETIME,
    PRIMARY KEY (id)
);