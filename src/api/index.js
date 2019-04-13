const user = require('./user');
const ladder = require('./ladder');
const baseTypeDefs = require('@utils/gqlLoader')('api/base.graphql');
const merge = require('lodash/merge');
const User = require('@models/User');
const Ladder = require('@models/Ladder');

/**
 * All type definitions are defined in .graphql files, which are just strings.
 * This helper function concatenates the contents of all the type def files into
 * one giant string.
 *
 * We use a base typedef file to define shared typedefs to extend off of.
 * This needs to always be the first type def file.
 */
function mergeTypeDefs(typeDefs) {
    return [baseTypeDefs, ...typeDefs].join(' ');
}

function mergeResolvers(resolvers) {
    return merge({}, ...resolvers);
}

module.exports = {
    typeDefs: mergeTypeDefs([user.typeDefs, ladder.typeDefs]),
    resolvers: mergeResolvers([user.resolvers, ladder.resolvers]),
    context: {
        models: {
            user: User,
            ladder: Ladder,
        },
    },
};
