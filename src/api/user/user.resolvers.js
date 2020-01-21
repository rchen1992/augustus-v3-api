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

const signup = async (_, args, ctx) => {
    const { userName, password, email } = args.input;
    const user = await ctx.services.auth.signup(userName, password, email);
    return user;
};

const login = async (_, args, ctx) => {
    const { userName, password } = args.input;
    const user = await ctx.services.auth.login(userName, password);
    return user;
};

module.exports = {
    Query: {
        users,
        user,
        me: authenticated(me),
    },
    Mutation: {
        signup,
        login,
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
        async ladders(user, _, ctx) {
            const userModel = await ctx.repos.user.getUserWithLadders(user.user_id);
            return userModel.ladders;
        },
        matches(user, _, ctx) {
            return ctx.repos.match.getMatchesByUser(user.user_id);
        },
        rating(user) {
            return user.ladder_user ? user.ladder_user.rating : null;
        },
        ratingDelta(user) {
            return user.ladder_user ? user.ladder_user.rating_delta : null;
        },
    },
};
