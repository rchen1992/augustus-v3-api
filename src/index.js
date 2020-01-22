require('dotenv').config();
require('module-alias/register');
const { GraphQLServer } = require('graphql-yoga');
const gqlServerConfig = require('./api');
const { checkJwt } = require('./middleware/jwtAuth');
const syncUser = require('./middleware/syncUser');

const serverOptions = {
    port: 8080,
    endpoint: '/graphql',
    // TODO: disable playground in prod.
    // playground: process.env.NODE_ENV === 'development' ? '/docs' : false,
    playground: '/docs',
    tracing: true,
    debug: true,
    cors: {
        credentials: true,
        origin: ['http://localhost:3000', 'https://augustus.netlify.com'], // your frontend urls.
    },
};

const server = new GraphQLServer(gqlServerConfig);

/**
 * Add middleware to `/graphql` endpoint.
 */
server.express.post(serverOptions.endpoint, checkJwt);
server.express.post(serverOptions.endpoint, syncUser);

server.start(serverOptions, () => console.log(`Server is running on http://localhost:8080`));
