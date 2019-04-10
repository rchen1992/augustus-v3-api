CREATE TABLE IF NOT EXISTS ladder_users (
	user_id bigint REFERENCES users(user_id),
	ladder_id bigint REFERENCES ladders(ladder_id),
	rating integer NOT NULL,
	rating_delta integer NOT NULL,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	PRIMARY KEY (user_id, ladder_id)
);

CREATE TRIGGER ladder_user_updated_at BEFORE UPDATE ON ladder_users FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
