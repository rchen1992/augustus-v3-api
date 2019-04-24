const mockLaddersRepo = require('@tests/mockRepos/ladder');
const { testQuery } = require('@tests/utils');

testQuery({
    id: 'Get all ladders basic data',
    query: `
        {
            ladders {
                id
                ladderName
                inviteToken
                createdAt
                updatedAt
            }
        }
    `,
    variables: {},
    context: () => {
        return {
            repos: {
                ladder: mockLaddersRepo,
            },
        };
    },
    expected: undefined,
});
