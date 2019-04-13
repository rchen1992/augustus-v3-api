module.exports = {
    resolvers: require('./ladder.resolvers'),
    typeDefs: require('@utils/gqlLoader')('api/ladder/ladder.graphql'),
};
