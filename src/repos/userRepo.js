const { User } = require('@models');

function generateRandomUsernameSuffix() {
    return Math.floor(Math.random() * 10000000).toString();
}

function createUserRepo(loaders) {
    async function getUserByUsername(userName) {
        const user = await loaders.userByName.load(userName);
        return user && user.toJSON();
    }

    return {
        getUserByUsername,

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

        async createUser({ userId, userName, email, avatarUrl }) {
            const user = await User.create({
                user_id: userId,
                user_name: userName,
                email,
                avatar_url: avatarUrl,
            });

            return user.toJSON();
        },

        async updateUser(userId, fields) {
            const user = await loaders.user.load(userId);
            if (!user) {
                return null;
            }

            await user.update(fields);
            return user.toJSON();
        },

        async generateUniqueUsername(userName) {
            let attemptedName = userName;
            let user = await getUserByUsername(attemptedName);
            while (user) {
                attemptedName = userName + generateRandomUsernameSuffix();
                user = await getUserByUsername(attemptedName);
            }

            return attemptedName;
        },
    };
}

module.exports = createUserRepo;
