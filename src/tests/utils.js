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
    return graphql(schema, query, null, ctx, variables);
}

/**
 * Helper function that takes a custom context object or function
 * and merges it with the actual context from the API.
 *
 * Used to override context variables with mock values.
 *
 * Also provides mock express req and res objects.
 *
 * @param {Object|Function} ctx
 */
function buildContext(ctx) {
    const mockReq = {
        request: {
            session: {},
        },
        response: {},
    };
    const computedCtx = typeof ctx === 'function' ? ctx() : ctx;
    return merge({}, context(mockReq), computedCtx);
}

/**
 * Runs a query test using a provided test case.
 * By default, if no expected result is provided, it simply does a snapshot test.
 */
function testQuery(testCase) {
    const { id, query, variables, context, expected, additionalAssertions } = testCase;

    test(`query: ${id}`, async () => {
        const fullContext = buildContext(context);
        const result = await runQuery(query, variables, fullContext);

        /**
         * If we provide an expected result, check against it.
         * Otherwise, just use snapshot testing.
         */
        if (expected !== undefined) {
            expect(result).toEqual(expected);
        } else {
            expect(result).toMatchSnapshot();
        }

        /**
         * Run callback for additional assertions.
         */
        if (additionalAssertions) {
            additionalAssertions(result, fullContext);
        }
    });
}

module.exports = {
    runQuery,
    testQuery,
};
