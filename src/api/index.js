const user = require('./user');
const ladder = require('./ladder');
const match = require('./match');
const ladderUser = require('./ladderUser');
const baseTypeDefs = require('@utils/gqlLoader')('api/base.graphql');
const baseResolvers = require('./base.resolvers');
const merge = require('lodash/merge');
const createLoaders = require('@loaders');
const createUserRepo = require('@repos/userRepo');
const createMatchRepo = require('@repos/matchRepo');
const createLadderRepo = require('@repos/ladderRepo');
const createLadderUserRepo = require('@repos/ladderUserRepo');
const createLadderService = require('@services/ladderService');
const createMatchService = require('@services/matchService');
const createUserService = require('@services/userService');

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
    typeDefs: mergeTypeDefs([user.typeDefs, ladder.typeDefs, match.typeDefs, ladderUser.typeDefs]),
    resolvers: mergeResolvers([
        baseResolvers,
        user.resolvers,
        ladder.resolvers,
        match.resolvers,
        ladderUser.resolvers,
    ]),
    context: req => {
        const { request, response } = req;
        const { currentUser } = request;

        const loaders = createLoaders();

        const userRepo = createUserRepo(loaders);
        const matchRepo = createMatchRepo(loaders);
        const ladderRepo = createLadderRepo(loaders);
        const ladderUserRepo = createLadderUserRepo(loaders);

        return {
            req: request, // express req
            res: response, // express res
            currentUser,
            repos: {
                user: userRepo,
                match: matchRepo,
                ladder: ladderRepo,
                ladderUser: ladderUserRepo,
            },
            services: {
                user: createUserService(userRepo),
                ladder: createLadderService(ladderRepo, ladderUserRepo),
                match: createMatchService(matchRepo, ladderUserRepo),
            },
        };
    },
};
