/**
 * User authentication guard.
 * Used to wrap resolvers as a "middleware" to ensure there is an authenticated user for this request.
 */
module.exports = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error(`Unauthenticated.`);
    }

    return next(root, args, context, info);
};
