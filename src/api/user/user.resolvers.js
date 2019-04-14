const users = (_, __, ctx) => {
    return ctx.models.user.findAll();
};

const user = (_, args, ctx) => {
    return ctx.models.user.findByPk(args.id);
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
            const userModel = await ctx.models.user.findOne({
                where: { user_id: user.user_id },
                include: [ctx.models.ladder],
            });
            return userModel.ladders;
        },
    },
};
