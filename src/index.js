require('dotenv').config();
require('module-alias/register');
const { GraphQLServer } = require('graphql-yoga');
const connection = require('@database/connection');
const User = require('@models/User');

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

connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// const num = Math.floor(Math.random() * 100000);
// User.create({
//     email: `hello${num}@test.com`,
//     user_name: `cooldude${num}`,
//     avatar_url: `google${num}.com`,
// }).then(user => console.log(user.user_id));

server.start(serverOptions, () => console.log(`Server is running on http://localhost:8080`));
