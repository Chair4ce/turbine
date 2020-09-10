SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE members;
TRUNCATE TABLE position;
TRUNCATE TABLE unassigned;
TRUNCATE TABLE double_billeted;
TRUNCATE TABLE position_assignment;
TRUNCATE TABLE afsc_chart;
TRUNCATE TABLE gaining_member;
TRUNCATE TABLE increment_log;
TRUNCATE TABLE position_master;

SET FOREIGN_KEY_CHECKS=1;
