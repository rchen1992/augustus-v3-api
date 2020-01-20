const { confirmPassword } = require('@helpers/password');

function createAuthService(userRepo) {
    return {
        async signup(userName, password, email) {
            // Check if user exists already. If so, this is a login attempt.
            let user = await userRepo.getUserByUsername(userName);
            if (user) {
                /**
                 * Catch login errors and re-throw with generic message
                 * so that malicious users can't determine valid usernames.
                 */
                try {
                    return await this.login(userName, password);
                } catch (e) {
                    throw new Error(`An error occurred during signup.`);
                }
            }

            // Otherwise, create a new user.
            user = await userRepo.createUser(userName, password, email);
            if (!user) {
                throw new Error('An error occurred during signup.');
            }

            return user;
        },

        async login(userName, password) {
            let user = await userRepo.getUserByUsername(userName);
            if (!user || !confirmPassword(password, user.password)) {
                throw new Error(`Username or password is incorrect. Please try again.`);
            }

            return user;
        },

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
            return userRepo.updateUser(userId, { email, avatarUrl });
        },
    };
}

module.exports = createAuthService;
