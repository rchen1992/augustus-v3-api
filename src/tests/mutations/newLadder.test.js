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
                ladderName
                inviteToken
                myLadderUser {
                    id
                    rating
                    ratingDelta
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
                        return {
                            ...mockLadders[0],
                            ladder_name: ladderName,
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
