const user = require('./user');
const merge = require('lodash/merge');
const User = require('@models/User');

/**
 * All type definitions are defined in .graphql files, which are just strings.
 * This helper function concatenates the contents of all the type def files into
 * one giant string.
 */
function mergeTypeDefs(typeDefs) {
    return typeDefs.join(' ');
}

function mergeResolvers(resolvers) {
    return merge({}, ...resolvers);
}

module.exports = {
    typeDefs: mergeTypeDefs([user.typeDefs]),
    resolvers: mergeResolvers([user.resolvers]),
    context: {
        models: {
            user: User,
        },
    },
};
