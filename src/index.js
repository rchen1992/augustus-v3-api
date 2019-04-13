require('dotenv').config();
require('module-alias/register');
const { GraphQLServer } = require('graphql-yoga');
const gqlServerConfig = require('./api');

const serverOptions = {
    port: 8080,
    endpoint: '/graphql',
    playground: '/docs',
    tracing: true,
    debug: true,
};

const server = new GraphQLServer(gqlServerConfig);

server.start(serverOptions, () => console.log(`Server is running on http://localhost:8080`));
