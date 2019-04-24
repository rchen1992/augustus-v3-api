const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a user's ratings and rating deltas in all of their ladders",
    query: `
        {
            user(id: 1) {
                id
                ladders {
                    id
                    ladderName
                    userRating
                    userRatingDelta
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
    expected: undefined,
});
