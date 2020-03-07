module.exports = {
    resolvers: require('./ladderUser.resolvers'),
    typeDefs: require('@utils/gqlLoader')('api/ladderUser/ladderUser.graphql'),
};
