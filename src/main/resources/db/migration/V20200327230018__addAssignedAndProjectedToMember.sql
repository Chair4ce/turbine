ALTER TABLE members ADD COLUMN projected_billet TEXT AFTER dor;
ALTER TABLE members ADD COLUMN assigned_billet TEXT AFTER projected_billet;