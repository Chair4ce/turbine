CREATE TABLE flight
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    org_id  TEXT,
    pas_Code TEXT,
    PRIMARY KEY (id)
);


INSERT INTO flight (org_id, pas_Code) VALUES
('SCXP', 'QAZWSXEDC'),
('SCPM','QAZWSXEDC'),
('SCOI','QAZWSXEDC'),
('SCXP', 'WSXEDCRFV'),
('SCPM','WSXEDCRFV');