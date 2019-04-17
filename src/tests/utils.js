const { typeDefs, resolvers, context } = require('@api');
const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const { merge } = require('lodash');

/**
 * Helper function to run any GraphQL query against our schema.
 * You can provide a context object to override properties on the default context.
 */
function runQuery(query, variables = {}, ctx = {}) {
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const computedCtx = typeof ctx === 'function' ? ctx() : ctx;
    return graphql(schema, query, null, merge({}, context(), computedCtx), variables);
}

module.exports = {
    runQuery,
};
