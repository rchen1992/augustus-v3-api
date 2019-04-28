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
    const mockReq = {
        request: {},
        response: {},
    };
    const computedCtx = typeof ctx === 'function' ? ctx() : ctx;
    return graphql(schema, query, null, merge({}, context(mockReq), computedCtx), variables);
}

/**
 * Runs a query test using a provided test case.
 * By default, if no expected result is provided, it simply does a snapshot test.
 */
function testQuery(testCase) {
    const { id, query, variables, context, expected } = testCase;

    test(`query: ${id}`, async () => {
        const result = await runQuery(query, variables, context);

        /**
         * If we provide an expected result, check against it.
         * Otherwise, just use snapshot testing.
         */
        if (expected !== undefined) {
            return expect(result).toEqual(expected);
        } else {
            return expect(result).toMatchSnapshot();
        }
    });
}

module.exports = {
    runQuery,
    testQuery,
};
