const { User } = require('@models');
const { hashPassword } = require('@helpers/password');

function createUserRepo(loaders) {
    return {
        async getAllUsers() {
            const users = await User.findAll();
            return users.map(user => user.toJSON());
        },

        async getUserByUsername(userName) {
            const user = await loaders.userByName.load(userName);
            return user && user.toJSON();
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

        async createUser(userName, password, email) {
            const user = await User.create({
                user_name: userName,
                password: hashPassword(password),
                email,
            });

            return user.toJSON();
        },
    };
}

module.exports = createUserRepo;
