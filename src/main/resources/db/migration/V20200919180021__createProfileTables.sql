CREATE TABLE group
(
    id   INT(11)     NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_group_name (name)
);

INSERT INTO group
VALUES (1, 'DGS 1'),
       (2, 'DGS 2'),
       (3, 'DGS 3'),
       (4, 'DGS 4'),
       (5, 'DGS 5'),
       (6, '480th ISRW');

CREATE TABLE profile
(
    id          INT(11)     NOT NULL AUTO_INCREMENT,
    username    VARCHAR(64) NOT NULL UNIQUE,
    group_id    INT(11) DEFAULT NULL,
    squadron_id INT     DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT profile_ibfk_1 FOREIGN KEY (group_id) REFERENCES group (id)
);

CREATE TABLE squadron
(
    id       INT(11)     NOT NULL AUTO_INCREMENT,
    name     VARCHAR(64) NOT NULL,
    group_id INT(11) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY group_id (group_id),
    CONSTRAINT squadron_ibfk_1 FOREIGN KEY (group_id) REFERENCES group (id)
);


INSERT INTO squadron
VALUES (1, '30 IS', 1),
       (2, '45 IS', 1),
       (3, '10 IS', 1),
       (4, '497 OSS', 1);

CREATE TABLE role
(
    id   INT(11)     NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

INSERT INTO role
VALUES (1, 'ADMIN'),
       (2, 'WRITER'),
       (3, 'READER');

ALTER TABLE profile
    ADD COLUMN role_id INT NOT NULL DEFAULT 3;

ALTER TABLE profile
    ADD CONSTRAINT role_ibfk_1 FOREIGN KEY (role_id) REFERENCES role (id);

UPDATE profile
SET profile.role_id = 1;

CREATE TABLE rank
(
    id           INT(11)     NOT NULL AUTO_INCREMENT,
    abbreviation VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_rank (abbreviation)
);

INSERT INTO rank (id, abbreviation)
VALUES (1, 'No Rank'),
       (2, 'AB'),
       (3, 'Amn'),
       (4, 'A1C'),
       (5, 'SrA'),
       (6, 'SSgt'),
       (7, 'TSgt'),
       (8, 'MSgt'),
       (9, 'SMSgt'),
       (10, '2d Lt'),
       (11, '1st Lt.'),
       (12, 'Capt'),
       (13, 'Maj'),
       (14, 'Lt Col'),
       (15, 'Col');



