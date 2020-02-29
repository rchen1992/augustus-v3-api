const { testQuery } = require('@tests/utils');

const userId = '1';
const token = '3dV982mqxe4';

testQuery({
    id: 'Join a ladder',
    query: `
        mutation joinLadder($token: String!) {
            joinLadder(token: $token) {
                id
                ladderName
                userRating
                userRatingDelta
                createdAt
                inviteToken
            }
        }
    `,
    variables: {
        userId,
        token,
    },
    context: () => {
        return {
            currentUser: {
                user_id: userId,
            },
            services: {
                ladder: {
                    joinLadder() {
                        return {
                            ladder_id: 10,
                            ladder_name: 'Skyvu',
                            invite_token: token,
                            created_at: '2018-12-11 09:39:31',
                            updated_at: '2018-10-09 01:00:11',
                            ladder_user: {
                                ladder_id: 10,
                                user_id: userId,
                                rating: 1000,
                                rating_delta: 0,
                                created_at: '2018-12-11 09:39:31',
                                updated_at: '2018-10-09 01:00:11',
                            },
                        };
                    },
                },
            },
        };
    },
    expected: undefined,
});
