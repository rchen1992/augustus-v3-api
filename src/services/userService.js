function createUserService(userRepo) {
    return {
        async newUser(userName, password, email) {
            // Check if user exists already. If so, this is a login attempt.
            let user = await userRepo.getUserByUsername(userName);
            if (user) {
                // TODO: log in user
            } else {
                // Otherwise, this is a signup
                user = await userRepo.createUser(userName, password, email);
            }

            return user;
        },
    };
}

module.exports = createUserService;
