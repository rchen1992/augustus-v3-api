const mockUserRepo = require('@tests/mockRepos/user');

module.exports = {
    id: 'Get all users basic data',
    query: `
        {
            users {
                id
                userName
                email
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
    expected: null,
};
