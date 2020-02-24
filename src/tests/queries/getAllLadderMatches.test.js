const mockLadderRepo = require('@tests/mockRepos/ladder');
const mockMatchRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a ladder's matches",
    query: `
        {
            ladder(id: 1) {
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
                ladder: mockLadderRepo,
                match: mockMatchRepo,
            },
        };
    },
    expected: undefined,
});
