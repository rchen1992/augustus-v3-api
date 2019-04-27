const mockMatchesRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get a match's 2 users",
    query: `
        {
            match(id: 1) {
                id
                user1 {
                    id
                    userName
                }
                user2 {
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
