/**
 * User field authorization guard.
 * Checks that the user we are resolving is the same as the current authenticated user.
 * Used to authorize individual fields on the user object.
 */
const userAuthorized = next => (user, args, context, info) => {
    if (!context.currentUser || context.currentUser.user_id !== user.user_id) {
        throw new Error(`User is unauthorized to access '${info.fieldName}' field.`);
    }

    return next(user, args, context, info);
};

module.exports = {
    userAuthorized,
};
