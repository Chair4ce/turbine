CREATE TABLE position_assignment
(
    id    INT NOT NULL AUTO_INCREMENT,
    afsc_group  TEXT,
    type  TEXT,
    pos_id INT,
    mbr_id INT,
    PRIMARY KEY (id)
);