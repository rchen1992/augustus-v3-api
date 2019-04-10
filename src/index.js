const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query {
        info: String!
    }
`;

const resolvers = {
    Query: {
        info: () => `Test query`,
    },
};

const serverOptions = {
    port: 8080,
    endpoint: '/graphql',
    playground: '/docs',
    tracing: true,
    debug: true,
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(serverOptions, () => console.log(`Server is running on http://localhost:8080`));
