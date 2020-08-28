ALTER TABLE members ADD COLUMN first_name TEXT AFTER full_name;
ALTER TABLE members ADD COLUMN last_name TEXT AFTER first_name;