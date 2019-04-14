const user = require('./user');
const ladder = require('./ladder');
const match = require('./match');
const baseTypeDefs = require('@utils/gqlLoader')('api/base.graphql');
const merge = require('lodash/merge');
const userRepo = require('@repos/userRepo');
const matchRepo = require('@repos/matchRepo');
const ladderRepo = require('@repos/ladderRepo');

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
    context: {
        repos: {
            user: userRepo,
            match: matchRepo,
            ladder: ladderRepo,
        },
    },
};
