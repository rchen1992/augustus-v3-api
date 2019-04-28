/**
 * User field authorization guard.
 * Checks that the user we are resolving is the same as the current user in session.
 * Used to authorize individual fields on the user object.
 */
const userAuthorized = next => (user, args, context, info) => {
    if (!context.req.session || context.req.session.userId !== user.user_id) {
        throw new Error(`User is unauthorized to access '${info.fieldName}' field.`);
    }

    return next(user, args, context, info);
};

module.exports = {
    userAuthorized,
};
