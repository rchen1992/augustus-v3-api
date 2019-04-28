const { testQuery } = require('@tests/utils');

const userId = 10;
const userName = 'newboi';

testQuery({
    id: 'Log in an existing user',
    query: `
        mutation login($input: LoginInput!) {
            login(input: $input) {
                id
                userName
                email
                createdAt
            }
        }
    `,
    variables: {
        input: {
            userName,
            password: 'password1',
        },
    },
    context: () => {
        return {
            services: {
                auth: {
                    login() {
                        return {
                            user_id: userId,
                            user_name: userName,
                            email: 'newboi@gmail.com',
                            created_at: '2018-12-11 09:39:31',
                            updated_at: '2018-10-09 01:00:11',
                        };
                    },
                },
            },
        };
    },
    expected: undefined,
    additionalAssertions(result, context) {
        expect(context.req.session.userId).toBe(userId);
    },
});
