const { testQuery } = require('@tests/utils');

const currentUser = {
    user_id: '10',
    user_name: 'newboi',
    email: 'newboi@gmail.com',
    created_at: '2018-12-11 09:39:31',
    updated_at: '2018-10-09 01:00:11',
};

testQuery({
    id: 'Get current user',
    query: `
        {
            me {
                id
                userName
                email
                createdAt
            }
        }
    `,
    variables: {},
    context: () => {
        return {
            currentUser,
        };
    },
    expected: undefined,
});
