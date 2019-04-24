const mockMatchesRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a match's ladder",
    query: `
        {
            match(id: 1) {
                id
                ladder {
                    id
                    ladderName
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
