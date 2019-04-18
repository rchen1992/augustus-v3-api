const { runQuery } = require('@tests/utils');
const { queryTestCases } = require('./queries');

describe('Queries', () => {
    // Running the test for each case in the cases array.
    queryTestCases.forEach(obj => {
        const { id, query, variables, context, expected } = obj;

        test(`query: ${id}`, async () => {
            const result = await runQuery(query, variables, context);

            /**
             * If we provide an expected result, check against it.
             * Otherwise, just use snapshot testing.
             */
            if (expected) {
                return expect(result).toEqual(expected);
            } else {
                return expect(result).toMatchSnapshot();
            }
        });
    });
});
