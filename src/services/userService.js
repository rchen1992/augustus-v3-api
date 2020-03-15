const createWhitelistMapperForUpdate = require('@helpers/createWhitelistMapperForUpdate');
const createValidationMessageMapper = require('@helpers/createValidationMessageMapper');
const {
    SEQUELIZE_VALIDATOR_KEY_LENGTH,
    SEQUELIZE_VALIDATOR_KEY_NOT_UNIQUE,
} = require('@constants/sequelizeValidatorKeys');

const whitelistMapper = createWhitelistMapperForUpdate({
    userName: {
        name: 'user_name',
        transform(value) {
            const trimmed = value.trim();
            if (trimmed.length === 0) {
                throw new Error('Username cannot be empty.');
            }

            return trimmed;
        },
    },
});

const getValidationErrorMessage = createValidationMessageMapper({
    [`user_name|${SEQUELIZE_VALIDATOR_KEY_LENGTH}`]: 'Username is too short or too long.',
    [`user_name|${SEQUELIZE_VALIDATOR_KEY_NOT_UNIQUE}`]: 'Username is already taken.',
});

function createUserService(userRepo) {
    return {
        /**
         * Syncs Auth0 user to our DB.
         */
        async syncUserFromAuth0({ userId, email, nickname, avatarUrl }) {
            let user = await userRepo.getUserById(userId);

            /**
             * If user doesn't exist, find/create a new one.
             * The reason we have to do find or create is to handle the case
             * where there are concurrent requests which look for the user in the DB and
             * don't find it, and thus fall into this `if` block to try and create a user.
             * The first insert will work, but all other requests will fail
             * due to unique key constraint violation.
             */
            if (!user) {
                const userName = await userRepo.generateUniqueUsername(nickname);
                return userRepo.findOrCreateUser({ userId, email, userName, avatarUrl });
            }

            /**
             * Otherwise, if user already exists, keep fields up to date.
             * We control the `userName` in our DB, so don't overwrite that with Auth0's nickname.
             */
            return userRepo.updateUser(userId, { email, avatar_url: avatarUrl });
        },

        async updateUser(userId, fields) {
            const updateFields = whitelistMapper(fields);

            try {
                const user = await userRepo.updateUser(userId, updateFields);
                return user;
            } catch (err) {
                throw new Error(getValidationErrorMessage(err));
            }
        },
    };
}

module.exports = createUserService;
