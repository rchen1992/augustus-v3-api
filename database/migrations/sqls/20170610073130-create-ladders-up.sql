CREATE TABLE IF NOT EXISTS ladders (
	ladder_id bigserial PRIMARY KEY,
	ladder_name text NOT NULL,
	invite_token text NOT NULL,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER ladder_updated_at BEFORE UPDATE ON ladders FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
