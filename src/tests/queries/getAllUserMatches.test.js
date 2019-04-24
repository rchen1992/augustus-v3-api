const mockMatchRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a user's matches",
    query: `
        {
            user(id: 1) {
                id
                matches {
                    id
                }
            }
        }
    `,
    variables: {},
    context: () => {
        return {
            repos: {
                match: mockMatchRepo,
            },
        };
    },
    expected: undefined,
});
