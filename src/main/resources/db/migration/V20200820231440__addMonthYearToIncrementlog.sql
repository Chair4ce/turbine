ALTER TABLE increment_log ADD COLUMN month TEXT AFTER increment_date;
ALTER TABLE increment_log ADD COLUMN year TEXT AFTER month;