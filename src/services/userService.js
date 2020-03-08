const createWhitelistMapperForUpdate = require('@helpers/createWhitelistMapperForUpdate');

const whitelistMapper = createWhitelistMapperForUpdate({
    userName: 'user_name',
});

function createUserService(userRepo) {
    return {
        /**
         * Syncs Auth0 user to our DB.
         */
        async syncUserFromAuth0({ userId, email, nickname, avatarUrl }) {
            let user = await userRepo.getUserById(userId);

            /**
             * If user doesn't exist, create a new one.
             */
            if (!user) {
                const userName = await userRepo.generateUniqueUsername(nickname);
                return userRepo.createUser({ userId, email, userName, avatarUrl });
            }

            /**
             * Otherwise, if user already exists, keep fields up to date.
             * We control the `userName` in our DB, so don't overwrite that with Auth0's nickname.
             */
            return userRepo.updateUser(userId, { email, avatar_url: avatarUrl });
        },

        updateUser(userId, fields) {
            const updateFields = whitelistMapper(fields);
            return userRepo.updateUser(userId, updateFields);
        },
    };
}

module.exports = createUserService;
