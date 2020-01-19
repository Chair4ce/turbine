CREATE TABLE squadron
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    squadron  TEXT,
    pas_Code TEXT,
    group_PAS TEXT,
    PRIMARY KEY (id)
);


INSERT INTO squadron (squadron, pas_Code, group_PAS) VALUES
('10 IS', 'QAZWSXEDC', 'OKMIJNUHB'),
('45 IS','WSXEDCRFV','IJNUHBYGV'),
('30 IS','EDCRFVTGB','UHBYGVTFC');