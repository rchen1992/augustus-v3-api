const user = require('./user');
const ladder = require('./ladder');
const match = require('./match');
const baseTypeDefs = require('@utils/gqlLoader')('api/base.graphql');
const merge = require('lodash/merge');
const createUserRepo = require('@repos/userRepo');
const createMatchRepo = require('@repos/matchRepo');
const createLadderRepo = require('@repos/ladderRepo');
const createLoaders = require('@loaders');

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
    typeDefs: mergeTypeDefs([user.typeDefs, ladder.typeDefs, match.typeDefs]),
    resolvers: mergeResolvers([user.resolvers, ladder.resolvers, match.resolvers]),
    context: () => {
        const loaders = createLoaders();
        return {
            repos: {
                user: createUserRepo(loaders),
                match: createMatchRepo(loaders),
                ladder: createLadderRepo(loaders),
            },
        };
    },
};
