const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query {
        info: String!
    }
`;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
    },
};

const serverOptions = {
    port: 4000,
    endpoint: '/graphql',
    playground: '/docs',
    tracing: true,
    debug: true,
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(serverOptions, () => console.log(`Server is running on http://localhost:4000`));
