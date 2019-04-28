/**
 * New match authorization guard.
 * Checks that the current user in session is one of the users participating in the match.
 */
const validateNewMatch = next => (root, args, context, info) => {
    const { currentUser } = context;

    const { user1Id, user2Id } = args.input;
    if (!currentUser || (currentUser.user_id !== user1Id && currentUser.user_id !== user2Id)) {
        throw new Error(`User is unauthorized to create match.`);
    }

    return next(root, args, context, info);
};

module.exports = {
    validateNewMatch,
};
