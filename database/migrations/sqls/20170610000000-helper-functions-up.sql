CREATE OR REPLACE FUNCTION update_updated_at()	
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;	
END;
$$ language 'plpgsql';

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
