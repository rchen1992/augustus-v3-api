const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a user's match stats in all of their ladders",
    query: `
        {
            user(id: 1) {
                id
                ladders {
                    id
                    ladderName
                    userMatchStats {
                        matchCount
                        winCount
                        lossCount
                        tieCount
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
                match: {
                    getLadderUserMatchStats() {
                        return {
                            matchCount: 7,
                            winCount: 4,
                            lossCount: 2,
                            tieCount: 1,
                        };
                    },
                },
            },
        };
    },
    expected: undefined,
});
