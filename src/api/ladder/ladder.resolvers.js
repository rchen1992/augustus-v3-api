const ladders = (_, __, ctx) => {
    return ctx.models.ladder.findAll();
};

const ladder = (_, args, ctx) => {
    return ctx.models.ladder.findByPk(args.id);
};

module.exports = {
    Query: {
        ladders,
        ladder,
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
    },
};
