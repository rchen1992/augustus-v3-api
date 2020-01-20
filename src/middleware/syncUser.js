const createLoaders = require('@loaders');
const createUserRepo = require('@repos/userRepo');
const createAuthService = require('@services/authService');

const syncUser = async (req, res, next) => {
    console.log('req user', req.user);
    console.log('req user data', JSON.parse(req.headers.userdata));

    const userId = req.user.sub;
    const userData = req.headers.userdata ? JSON.parse(req.headers.userdata) : null;
    if (!userId || !userData) {
        return next();
    }

    const { email, nickname, avatar_url: avatarUrl } = userData;

    const loaders = createLoaders();
    const userRepo = createUserRepo(loaders);
    const authService = createAuthService(userRepo);

    await authService.syncUserFromAuth0({
        userId,
        email,
        nickname,
        avatarUrl,
    });

    next();
};

module.exports = syncUser;
