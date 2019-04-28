const users = (_, __, ctx) => {
    return ctx.repos.user.getAllUsers();
};

const user = (_, args, ctx) => {
    return ctx.repos.user.getUserById(args.id);
};

const signup = async (_, args, ctx) => {
    const { userName, password, email } = args.input;
    const user = await ctx.services.auth.signup(userName, password, email);

    // Set userId into session
    if (user && user.user_id) {
        ctx.req.session.userId = user.user_id;
    }

    return user;
};

const login = async (_, args, ctx) => {
    const { userName, password } = args.input;
    const user = await ctx.services.auth.login(userName, password);

    // Set userId into session
    if (user && user.user_id) {
        ctx.req.session.userId = user.user_id;
    }

    return user;
};

module.exports = {
    Query: {
        users,
        user,
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
