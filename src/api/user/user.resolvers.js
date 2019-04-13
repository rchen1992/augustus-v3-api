const users = (_, __, ctx) => {
    return ctx.models.user.findAll();
};

module.exports = {
    Query: {
        users,
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
    },
};
