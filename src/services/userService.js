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
