const matches = (_, __, ctx) => {
    return ctx.repos.match.getAllMatches();
};

const match = (_, args, ctx) => {
    return ctx.repos.match.getMatchById(args.id);
};

module.exports = {
    Query: {
        matches,
        match,
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
