const { User } = require('@models');

function createUserRepo(loaders) {
    return {
        async getAllUsers() {
            const users = await User.findAll();
            return users.map(user => user.toJSON());
        },

        async getUserById(userId) {
            const user = await loaders.user.load(userId);
            return user && user.toJSON();
        },

        async getUserWithLadders(userId) {
            const user = await loaders.user.load(userId);
            if (!user) {
                return null;
            }

            const ladders = await user.getLadders();
            return {
                ...user.toJSON(),
                ladders: ladders.map(ladder => ladder.toJSON()),
            };
        },
    };
}

module.exports = createUserRepo;
