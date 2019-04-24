const mockMatchesRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a match's winner",
    query: `
        {
            match(id: 1) {
                id
                winner {
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
