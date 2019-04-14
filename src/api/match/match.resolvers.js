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
    },
};
