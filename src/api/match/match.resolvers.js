const { validateNewMatch } = require('@guards/match');

const matches = (_, args, ctx) => {
    return ctx.repos.match.getMatches(args.offset, args.limit);
};

const match = (_, args, ctx) => {
    return ctx.repos.match.getMatchById(args.id);
};

const newMatch = (_, args, ctx) => {
    const { ladderId, user1Id, user2Id, winnerId, loserId } = args.input;
    return ctx.services.match.newMatch(ladderId, user1Id, user2Id, winnerId, loserId);
};

module.exports = {
    Query: {
        matches,
        match,
    },
    Mutation: {
        newMatch: validateNewMatch(newMatch),
    },
    Match: {
        id(match) {
            return match.match_id + '';
        },
        createdAt(match) {
            return match.created_at;
        },
        updatedAt(match) {
            return match.updated_at;
        },
        async ladder(match, _, ctx) {
            const matchModel = await ctx.repos.match.getMatchWithLadder(match.match_id);
            return matchModel.ladder;
        },
        async user1(match, _, ctx) {
            const matchModel = await ctx.repos.match.getMatchWithUser1(match.match_id);
            return matchModel.user1;
        },
        async user2(match, _, ctx) {
            const matchModel = await ctx.repos.match.getMatchWithUser2(match.match_id);
            return matchModel.user2;
        },
        async winner(match, _, ctx) {
            const matchModel = await ctx.repos.match.getMatchWithWinner(match.match_id);
            return matchModel.winner;
        },
        async loser(match, _, ctx) {
            const matchModel = await ctx.repos.match.getMatchWithLoser(match.match_id);
            return matchModel.loser;
        },
    },
};
