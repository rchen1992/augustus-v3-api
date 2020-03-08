const authenticated = require('@guards/authenticated');
const { userAuthorized } = require('@guards/user');

const users = (_, __, ctx) => {
    return ctx.repos.user.getAllUsers();
};

const user = (_, args, ctx) => {
    return ctx.repos.user.getUserById(args.id);
};

const me = (_, __, ctx) => {
    return ctx.currentUser;
};

const updateUser = (_, args, ctx) => {
    return ctx.services.user.updateUser(ctx.currentUser.user_id, args.fields);
};

module.exports = {
    Query: {
        users,
        user,
        me: authenticated(me),
    },
    Mutation: {
        updateUser: authenticated(updateUser),
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
        email: userAuthorized(user => {
            return user.email;
        }),
        createdAt(user) {
            return user.created_at;
        },
        updatedAt(user) {
            return user.updated_at;
        },
        async userLadders(user, _, ctx) {
            const userModel = await ctx.repos.user.getUserWithUserLadders(user.user_id);
            return userModel.userLadders;
        },
        matches(user, args, ctx) {
            return ctx.repos.match.getMatchesByUser(user.user_id, args.offset, args.limit);
        },
        matchCount(user, _, ctx) {
            return ctx.repos.match.countMatchesByUser(user.user_id);
        },
    },
};
