const mockUserRepo = require('@tests/mockRepos/user');
const { testQuery } = require('@tests/utils');

testQuery({
    id: 'Get all users basic data',
    query: `
        {
            users {
                id
                userName
                avatarUrl
                createdAt
                updatedAt
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
