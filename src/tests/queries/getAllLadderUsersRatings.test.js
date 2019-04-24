const mockLadderRepo = require('@tests/mockRepos/ladder');
const { testQuery } = require('@tests/utils');

testQuery({
    id: 'Get user ratings for all users in a ladder',
    query: `
        {
            ladder(id: 1) {
                id
                users {
                    id
                    userName
                    rating
                    ratingDelta
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
