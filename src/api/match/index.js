module.exports = {
    resolvers: require('./match.resolvers'),
    typeDefs: require('@utils/gqlLoader')('api/match/match.graphql'),
};
