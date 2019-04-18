const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a user's ladders",
    query: `
        {
            user(id: 1) {
                id
                ladders {
                    id
                    ladderName
                }
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
});
