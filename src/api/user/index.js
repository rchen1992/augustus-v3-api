module.exports = {
    resolvers: require('./user.resolvers'),
    typeDefs: require('@utils/gqlLoader')('api/user/user.graphql'),
};
