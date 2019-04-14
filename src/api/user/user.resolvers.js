const users = (_, __, ctx) => {
    return ctx.repos.user.getAllUsers();
};

const user = (_, args, ctx) => {
    return ctx.repos.user.getUserById(args.id);
};

module.exports = {
    Query: {
        users,
        user,
    },
    User: {
        id(user) {
            return user.user_id + '';
        },
        userName(user) {
            return user.user_name;
        },
        avatarUrl(user) {
            return user.avatar_url;
        },
        createdAt(user) {
            return user.created_at;
        },
        updatedAt(user) {
            return user.updated_at;
        },
        async ladders(user, _, ctx) {
            const userModel = await ctx.repos.user.getUserWithLadders(user.user_id);
            return userModel.ladders;
        },
        matches(user, _, ctx) {
            return ctx.repos.match.getMatchesByUser(user.user_id);
        },
    },
};
