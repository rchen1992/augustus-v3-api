CREATE TABLE IF NOT EXISTS matches (
	match_id bigserial PRIMARY KEY,
	ladder_id bigint NOT NULL REFERENCES ladders(ladder_id),
	user_1_id bigint NOT NULL REFERENCES users(user_id),
	user_2_id bigint NOT NULL REFERENCES users(user_id),
	winner_id bigint REFERENCES users(user_id),
	loser_id bigint REFERENCES users(user_id),
	tied boolean NOT NULL,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	CONSTRAINT check_winner_loser_tied CHECK (
		(user_1_id != user_2_id) AND
		(
			(winner_id IS NOT DISTINCT FROM user_1_id AND loser_id IS NOT DISTINCT FROM user_2_id AND tied = FALSE) OR
			(winner_id IS NOT DISTINCT FROM user_2_id AND loser_id IS NOT DISTINCT FROM user_1_id AND tied = FALSE) OR
			(tied = TRUE AND winner_id IS NULL AND loser_id IS NULL)
		)
	)
);

CREATE TRIGGER match_updated_at BEFORE UPDATE ON matches FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
