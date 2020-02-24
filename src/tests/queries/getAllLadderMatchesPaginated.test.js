const mockLadderRepo = require('@tests/mockRepos/ladder');
const mockMatchRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a ladder's matches paginated with limit and offset",
    query: `
        {
            ladder(id: 1) {
                id
                matches(offset: 1, limit: 1) {
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
                ladder: mockLadderRepo,
                match: mockMatchRepo,
            },
        };
    },
    expected: undefined,
});
