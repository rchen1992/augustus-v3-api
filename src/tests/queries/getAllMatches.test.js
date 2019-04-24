const mockMatchesRepo = require('@tests/mockRepos/match');
const { testQuery } = require('@tests/utils');

testQuery({
    id: 'Get all matches basic data',
    query: `
        {
            matches {
                id
                tied
                createdAt
                updatedAt
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
