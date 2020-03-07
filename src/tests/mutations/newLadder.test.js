const { testQuery } = require('@tests/utils');
const { mockLadders } = require('@tests/mockData/dataSet');
const mockLadderUsersRepo = require('@tests/mockRepos/ladderUser');

const userId = '1';
const ladderName = 'My New Ladder';

testQuery({
    id: 'Create new ladder',
    query: `
        mutation createLadder($ladderName: String!) {
            newLadder(ladderName: $ladderName) {
                id
                rating
                ratingDelta
                ladder {
                    id
                    ladderName
                    inviteToken
                }
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
                        const ladder = mockLadders[0];
                        return {
                            ...mockLadderUsersRepo.createLadderUser(ladder.ladder_id, userId),
                            ladder: {
                                ...ladder,
                                ladder_name: ladderName,
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
