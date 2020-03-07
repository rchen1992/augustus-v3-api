module.exports = {
    LadderUser: {
        id(ladderUser) {
            return `${ladderUser.ladder_id}:${ladderUser.user_id}`;
        },
        rating(ladderUser) {
            return ladderUser.rating;
        },
        ratingDelta(ladderUser) {
            return ladderUser.rating_delta;
        },
        rank(ladderUser, _, ctx) {
            return ctx.services.ladder.getUserRank(ladderUser.ladder_id, ladderUser.user_id);
        },
        matchStats(ladderUser, _, ctx) {
            return ctx.services.match.getLadderUserMatchStats(
                ladderUser.user_id,
                ladderUser.ladder_id
            );
        },
        user(ladderUser, _, ctx) {
            return ladderUser.user
                ? ladderUser.user
                : ctx.repos.user.getUserById(ladderUser.user_id);
        },
        ladder(ladderUser, _, ctx) {
            return ladderUser.ladder
                ? ladderUser.ladder
                : ctx.repos.ladder.getLadderById(ladderUser.ladder_id);
        },
        joinDate(ladderUser) {
            return ladderUser.created_at;
        },
    },
};
