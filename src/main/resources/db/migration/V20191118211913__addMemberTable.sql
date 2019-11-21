
CREATE TABLE metric
(
    id      INT(11) NOT NULL AUTO_INCREMENT,
    action  VARCHAR(64),
    context VARCHAR(512),
    PRIMARY KEY (id)
);
CREATE TABLE members
(
    id              INT(11) NOT NULL AUTO_INCREMENT,
    full_name       VARCHAR(64),
    grade           VARCHAR(64),
    assigned_pas    VARCHAR(64),
    office_symbol   VARCHAR(64),
    duty_title      VARCHAR(64),
    duty_start_date VARCHAR(64),
    dafsc           VARCHAR(64),
    duty_phone      VARCHAR(64),
    awardec_status  VARCHAR(64),
    epr_opr_status  VARCHAR(64),
    primary key (id)
);

INSERT INTO members (full_name,grade,assigned_pas,office_symbol,duty_title,duty_start_date,dafsc,duty_phone,awardec_status,epr_opr_status) values
('ABRAMS, JOSEPH L','CPT','OP1CFNY2','SGPF','GROUP PHYSICIAN','9-Jul-17','-48G3','6966606', null, null),
('ACKER, MICHAEL SCOTT','TSG','OP1CF333','DOM','NCOIC, FMV ELEMENT','3-Apr-16','-1N171A','5743969', null, null),
('ADAIR, JESS MICHAEL','TSG','OP1CFS14','CAPES','NCOIC, COMSEC MGMT','6-Nov-15','-3D172','7845115', null, null),
('AGLANAO, MARK NOLAN AGUI','SSG','OP1CFS14','SCON','CRITICOM SUPERVISOR','10-Aug-16','-3D052','7845995', null, null),
('AGUILAR, JOSEPH MICHAEL','SSG','OP1CFT2N','DOM','NTI ANALYST','22-Feb-17','-1N451B','7846613', null, null),
('AGYEMANG, BRANDON OSEI AFRIF','SRA','OP1CFT2N','DOM','TOPI TECH HEALTH ANALYST','1-Apr-17','-1N351H','7845958', null, null),
('ALARCON, JOSEPH CARLOS','SRA','OP1CFT2N','DOM','TOPI AIR ANALYST','24-Jun-16','-1N351H','7845958', null, null),
('ALBERT, CHRISTOPHER AARON','A1C','OP1CF333','DOA-F','GEOSPATIAL INTELLIGENCE ANALYST','6-Nov-15','-1N131A','7843670', null, null),
('ALDERETE, WILLIAM R','MSG','OP1CFT2N','DOO','OPERATIONS FLIGHT CHIEF','1-Nov-16','-1N471B','7842401', null, null),
('ALLEN, JAMES L','MSG','OP1CFT2N','DOM','ANALYSIS & PROD, SUPERINTENDENT','6-Nov-15','-1N371H','7844225', null, null),
('ALLEN, MEGAN NICOLE','SSG','OP1CFS14','SCOO','MISSION SYSTEMS SUPERVISOR','12-Dec-16','-3D052','3157845995', null, null),
('ALSEPT, AUSTIN ROBERT','A1C','OP1CF333','','GEOSPATIAL INTEL ANALYST','19-Oct-16','-1N131A','73770717', null, null),
('ALVARADO, MATTHEW BERMEJO','SRA','OP1CFS14','SCOO','MISSION SYSTEMS TECHNICIAN','30-Mar-17','-3D052','7845995', null, null),
('AMBROSIOEARLE, TALIA SELENA','A1C','OP1CF333','DOA','GEOSPATIAL INTEL ANALYST','15-Nov-16','-1N131A','7777777', null, null),
('AMSPAUGH, ZACHARY WILSON','SRA','OP1CFT2N','DOO','SPECIAL SIGNALS OPERATOR','20-Nov-16','-1N251C','7841201', null, null),
('AN, GUKTAE NONE','1LT','OP1CFT2N','DOO','LINE MOC','30-Jun-16','-14N3','7845946', null, null),
('ANDERSEN, BRENTEN RHETT','SSG','OP1CFS14','SCXS','CYBER SECURITY SUPERVISOR','2-May-17','-3D053','7846717', null, null),
('ANDERSON, JASON C','TSG','OP1CFNY2','ART','MED TECH, AMN RESILIENCY TEAM','15-Feb-17','-4N071','7840132', null, null),
('ANDERSON, RAHSHEIM DESHAWN','TSG','OP1CFT2N','DOO','ASSISTANT FLIGHT CHIEF, ISR OPS','12-Feb-17','-1N471B','7841591', null, null),
('ANDERSON, TAIT DAVID','A1C','OP1CF333','','GEOSPATIAL INTEL ANALYST','6-Mar-17','-1N131A','7843670', null, null);
