const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a user's rank in all of their ladders",
    query: `
        {
            user(id: 1) {
                id
                userLadders {
                    id
                    rank
                    ladder {
                        id
                        ladderName
                    }
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
            services: {
                ladder: {
                    getUserRank() {
                        return 3;
                    },
                },
            },
        };
    },
    expected: undefined,
});
