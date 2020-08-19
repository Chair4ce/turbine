CREATE TABLE afsc_chart
(
    id         INT NOT NULL AUTO_INCREMENT,
    afsc       TEXT,
    assigned   INT,
    authorized INT,
    month      INT,
    year       INT,
    manning    TEXT,
    PRIMARY KEY (id)
);