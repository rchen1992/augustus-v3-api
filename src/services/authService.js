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
    };
}

module.exports = createAuthService;
