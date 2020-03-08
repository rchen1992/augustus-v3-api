const { testQuery } = require('@tests/utils');
const { mockUsers } = require('@tests/mockData/dataSet');

const userId = '1';
const userName = 'updated username';

testQuery({
    id: 'Update user',
    query: `
        mutation updateUser($fields: UpdateUserInput!) {
            updateUser(fields: $fields) {
                id
                userName
            }
        }
    `,
    variables: {
        fields: {
            userName,
        },
    },
    context: () => {
        return {
            currentUser: {
                user_id: userId,
            },
            services: {
                user: {
                    updateUser() {
                        const user = mockUsers[0];
                        return {
                            ...user,
                            user_name: userName,
                        };
                    },
                },
            },
        };
    },
    expected: undefined,
});
