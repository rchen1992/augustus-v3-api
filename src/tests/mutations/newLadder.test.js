const { testQuery } = require('@tests/utils');

const userId = '1';
const ladderName = 'My New Ladder';

testQuery({
    id: 'Create new ladder',
    query: `
        mutation createLadder($ladderName: String!) {
            newLadder(ladderName: $ladderName) {
                id
                ladderName
                inviteToken
                userRating
                userRatingDelta
            }
        }
    `,
    variables: {
        userId,
        ladderName,
    },
    context: () => {
        return {
            currentUser: {
                user_id: userId,
            },
            services: {
                ladder: {
                    newLadder() {
                        return {
                            ladder_id: 10,
                            ladder_name: ladderName,
                            invite_token: 'tRJcyp2Jkr13',
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
