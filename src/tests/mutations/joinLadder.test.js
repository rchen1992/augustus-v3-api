const { testQuery } = require('@tests/utils');
const { mockLadders } = require('@tests/mockData/dataSet');
const mockLadderUsersRepo = require('@tests/mockRepos/ladderUser');

const userId = '1';
const token = '3dV982mqxe4';

testQuery({
    id: 'Join a ladder',
    query: `
        mutation joinLadder($token: String!) {
            joinLadder(token: $token) {
                id
                rating
                ratingDelta
                ladder {
                    id
                    ladderName
                    createdAt
                    inviteToken
                }
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
                        const ladder = mockLadders[0];
                        return {
                            ...mockLadderUsersRepo.createLadderUser(ladder.ladder_id, userId),
                            ladder: {
                                ...ladder,
                                invite_token: token,
                            },
                        };
                    },
                },
            },
            repos: {
                ladderUser: mockLadderUsersRepo,
            },
        };
    },
    expected: undefined,
});
