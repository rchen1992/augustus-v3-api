const matches = (_, __, ctx) => {
    return ctx.models.match.findAll();
};

module.exports = {
    Query: {
        matches,
    },
    Match: {
        matchId(match) {
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
