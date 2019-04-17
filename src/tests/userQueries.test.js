const mockUserRepo = require('@tests/mockRepos/user');
const { runQuery } = require('@tests/utils');

const getAllUsersTestCase = {
    id: 'Get all users basic data',
    query: `
        {
            users {
                id
                userName
                email
                avatarUrl
                createdAt
                updatedAt
            }
        }
    `,
    variables: {},
    context: () => {
        return {
            repos: {
                user: mockUserRepo,
            },
        };
    },
    expected: null,
};

describe('User queries', () => {
    const cases = [getAllUsersTestCase];

    // Running the test for each case in the cases array.
    cases.forEach(obj => {
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
