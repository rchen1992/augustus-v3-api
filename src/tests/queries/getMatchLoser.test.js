const mockMatchesRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a match's loser",
    query: `
        {
            match(id: 1) {
                id
                loser {
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
                match: mockMatchesRepo,
            },
        };
    },
    expected: undefined,
});
