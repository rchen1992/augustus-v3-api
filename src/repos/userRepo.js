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

        async getUserWithUserLadders(userId) {
            const user = await loaders.user.load(userId);
            if (!user) {
                return null;
            }

            /**
             * Getting ladders through relationship will put
             * `ladder_user` on each of the ladder objects.
             *
             * We need to map it so that ladderUser is the root object
             * and `ladder` is a nested field inside ladderUser, instead
             * of the other way around.
             */
            const ladders = await user.getLadders();
            const ladderUsers = ladders.map(ladder => {
                const exportedLadder = ladder.toJSON();
                return {
                    ...exportedLadder.ladder_user,
                    ladder: exportedLadder,
                    user,
                };
            });

            return {
                ...user.toJSON(),
                userLadders: ladderUsers,
            };
        },

        async findOrCreateUser({ userId, userName, email, avatarUrl }) {
            /**
             * Under the hood, this runs in a transaction so that
             * there is no chance for another request to create a record
             * in between the find and create.
             */
            const results = await User.findOrCreate({
                where: {
                    user_id: userId,
                },
                defaults: {
                    user_name: userName,
                    email,
                    avatar_url: avatarUrl,
                },
            });

            return results.length > 0 ? results[0].toJSON() : null;
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
