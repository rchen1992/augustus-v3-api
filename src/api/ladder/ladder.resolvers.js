const authenticated = require('@guards/authenticated');

const ladders = (_, __, ctx) => {
    return ctx.repos.ladder.getAllLadders();
};

const ladder = (_, args, ctx) => {
    return ctx.repos.ladder.getLadderById(args.id);
};

const ladderByInviteToken = (_, args, ctx) => {
    return ctx.repos.ladder.getLadderByInviteToken(args.token);
};

const newLadder = (_, args, ctx) => {
    return ctx.services.ladder.newLadder(args.ladderName, ctx.currentUser.user_id);
};

const joinLadder = (_, args, ctx) => {
    return ctx.services.ladder.joinLadder(args.token, ctx.currentUser.user_id);
};

module.exports = {
    Query: {
        ladders,
        ladder,
        ladderByInviteToken,
    },
    Mutation: {
        newLadder: authenticated(newLadder),
        joinLadder: authenticated(joinLadder),
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
        myLadderUser: authenticated((ladder, _, ctx) => {
            return ctx.repos.ladderUser.getLadderUser(ladder.ladder_id, ctx.currentUser.user_id);
        }),
        ladderUser(ladder, args, ctx) {
            return ctx.repos.ladderUser.getLadderUser(ladder.ladder_id, args.userId);
        },
        ladderUsers(ladder, args, ctx) {
            return ctx.services.ladder.getLadderWithLadderUsers(ladder.ladder_id, args.orderBy);
        },
        async matches(ladder, args, ctx) {
            const ladderModel = await ctx.repos.ladder.getLadderWithMatches(
                ladder.ladder_id,
                args.offset,
                args.limit
            );
            return ladderModel.matches;
        },
        matchCount(ladder, _, ctx) {
            return ctx.repos.match.countMatchesByLadder(ladder.ladder_id);
        },
    },
};
