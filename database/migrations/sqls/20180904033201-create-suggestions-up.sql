CREATE TABLE IF NOT EXISTS suggestion (
	suggestion_id bigserial PRIMARY KEY,
	user_id varchar(128) REFERENCES users(user_id),
	content text NOT NULL,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);
