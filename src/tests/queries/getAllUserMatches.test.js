const mockMatchRepo = require('@tests/mockRepos/match');
const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a user's matches",
    query: `
        {
            user(id: 1) {
                id
                matches {
                    id
                    createdAt
                }
                matchCount
            }
        }
    `,
    variables: {},
    context: () => {
        return {
            repos: {
                match: mockMatchRepo,
                user: mockUserRepo,
            },
        };
    },
    expected: undefined,
});
