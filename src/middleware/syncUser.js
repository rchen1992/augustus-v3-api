const createLoaders = require('@loaders');
const createUserRepo = require('@repos/userRepo');
const createUserService = require('@services/userService');

/**
 * Middleware that syncs users from Auth0 to our own DB.
 * Why would we want to manage our own user table when Auth0 already has one?
 * Two main reasons:
 * - add additional fields to a user object (ex. unique username)
 * - perform table joins with the user table instead of making calls
 *  to Auth0's REST API and manually joining in memory.
 */
const syncUser = async (req, res, next) => {
    /**
     * `req.user` is set by the JWT auth middleware.
     */
    const userId = req.user ? req.user.sub : null;

    /**
     * The frontend sends stringified JSON in a header for the user data.
     * This is required in order to add the user data to our DB.
     */
    const userData = req.headers.userdata ? JSON.parse(req.headers.userdata) : null;

    if (!userId || !userData) {
        return next();
    }

    console.log('req user', req.user);
    console.log('req user data', userData);

    const { email, nickname, avatar_url: avatarUrl } = userData;

    const loaders = createLoaders();
    const userRepo = createUserRepo(loaders);
    const userService = createUserService(userRepo);

    const user = await userService.syncUserFromAuth0({
        userId,
        email,
        nickname,
        avatarUrl,
    });

    if (user) {
        req.currentUser = user;
    }

    next();
};

module.exports = syncUser;
