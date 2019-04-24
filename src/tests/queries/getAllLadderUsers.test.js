const mockLadderRepo = require('@tests/mockRepos/ladder');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a ladder's users",
    query: `
        {
            ladder(id: 1) {
                id
                users {
                    id
                    userName
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
