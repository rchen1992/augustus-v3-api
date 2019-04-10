CREATE TABLE IF NOT EXISTS users (
	user_id bigserial PRIMARY KEY,
	email citext UNIQUE,
	user_name citext UNIQUE,
	avatar_url text UNIQUE,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER user_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
