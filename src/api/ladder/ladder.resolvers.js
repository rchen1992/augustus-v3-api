const authenticated = require('@guards/authenticated');

const ladders = (_, __, ctx) => {
    return ctx.repos.ladder.getAllLadders();
};

const ladder = (_, args, ctx) => {
    return ctx.repos.ladder.getLadderById(args.id);
};

const newLadder = (_, args, ctx) => {
    return ctx.services.ladder.newLadder(args.ladderName, ctx.currentUser.user_id);
};

module.exports = {
    Query: {
        ladders,
        ladder,
    },
    Mutation: {
        newLadder: authenticated(newLadder),
    },
    Ladder: {
        id(ladder) {
            return ladder.ladder_id + '';
        },
        ladderName(ladder) {
            return ladder.ladder_name;
        },
        inviteToken(ladder) {
            return ladder.invite_token;
        },
        createdAt(ladder) {
            return ladder.created_at;
        },
        updatedAt(ladder) {
            return ladder.updated_at;
        },
        userRating(ladder) {
            return ladder.ladder_user ? ladder.ladder_user.rating : null;
        },
        userRatingDelta(ladder) {
            return ladder.ladder_user ? ladder.ladder_user.rating_delta : null;
        },
        userRank(ladder, _, ctx) {
            return ladder.ladder_user
                ? ctx.services.ladder.getUserRank(ladder.ladder_id, ladder.ladder_user.user_id)
                : null;
        },
        userMatchStats(ladder, _, ctx) {
            return ladder.ladder_user
                ? ctx.services.match.getLadderUserMatchStats(
                      ladder.ladder_user.user_id,
                      ladder.ladder_id
                  )
                : null;
        },
        async users(ladder, args, ctx) {
            return ctx.services.ladder.getLadderWithUsers(ladder.ladder_id, args.orderBy);
        },
        async matches(ladder, args, ctx) {
            const ladderModel = await ctx.repos.ladder.getLadderWithMatches(
                ladder.ladder_id,
                args.offset,
                args.limit
            );
            return ladderModel.matches;
        },
    },
};
