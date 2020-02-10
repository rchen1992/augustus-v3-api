const mockMatchRepo = require('@tests/mockRepos/match');
const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a user's matches paginated with offset and limit",
    query: `
        {
            user(id: 2) {
                id
                matches(offset: 1, limit: 2) {
                    id
                    createdAt
                }
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
