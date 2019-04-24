const mockLadderRepo = require('@tests/mockRepos/ladder');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a ladder's matches",
    query: `
        {
            ladder(id: 1) {
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
                ladder: mockLadderRepo,
            },
        };
    },
    expected: undefined,
});
