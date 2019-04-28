const { testQuery } = require('@tests/utils');

const userId = 10;
const userName = 'newboi';
const password = 'password1';
const email = 'newboi@gmail.com';

testQuery({
    id: 'Sign up a new user',
    query: `
        mutation signup($input: SignupInput!) {
            signup(input: $input) {
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
            password,
            email,
        },
    },
    context: () => {
        return {
            services: {
                auth: {
                    signup() {
                        return {
                            user_id: userId,
                            user_name: userName,
                            email,
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
