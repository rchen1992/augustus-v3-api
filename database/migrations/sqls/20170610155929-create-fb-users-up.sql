CREATE TABLE IF NOT EXISTS fb_users (
	fb_user_id bigint PRIMARY KEY,
	user_id bigint REFERENCES users(user_id),
	fb_name text NOT NULL,
	access_token text NOT NULL,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER fb_user_updated_at BEFORE UPDATE ON fb_users FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
