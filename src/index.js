require('dotenv').config();
require('module-alias/register');
const { GraphQLServer } = require('graphql-yoga');
const gqlServerConfig = require('./api');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const serverOptions = {
    port: 8080,
    endpoint: '/graphql',
    playground: '/docs',
    tracing: true,
    debug: true,
    cors: {
        credentials: true,
        origin: ['http://localhost:8080'], // your frontend url.
    },
};

const server = new GraphQLServer(gqlServerConfig);

// session middleware
server.express.use(
    session({
        // session store instance
        store: new pgSession({
            // prune sessions once every 2 days
            pruneSessionInterval: 60 * 60 * 24 * 2,
        }),

        // used to sign session ID cookie
        secret: process.env.SESSION_SECRET,

        // sessions will not be saved if they weren't modified
        resave: false,

        // uninitialized sessions will not be saved to store
        saveUninitialized: false,

        // node running behind proxy, uses X-Forwarded-Proto header
        proxy: true,

        // default cookie name is "connect.sid"
        name: 'augustus.sid',

        cookie: {
            // use secure cookies in production
            secure: process.env.NODE_ENV === 'production',

            // can't access cookie from JS
            httpOnly: true,

            // csrf prevention
            sameSite: 'lax',

            // 10 years
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        },
    })
);

server.start(serverOptions, () => console.log(`Server is running on http://localhost:8080`));
