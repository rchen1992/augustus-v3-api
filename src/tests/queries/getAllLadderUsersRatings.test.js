const mockLadderRepo = require('@tests/mockRepos/ladder');
const mockLadderUserRepo = require('@tests/mockRepos/ladderUser');
const createLadderService = require('@services/ladderService');
const { testQuery } = require('@tests/utils');

testQuery({
    id: 'Get user ratings for all users in a ladder',
    query: `
        {
            ladder(id: 1) {
                id
                ladderUsers {
                    id
                    rating
                    ratingDelta
                    rank
                    joinDate
                    user {
                        id
                        userName
                    }
                }
            }
        }
    `,
    variables: {},
    context: () => {
        return {
            services: {
                ladder: createLadderService(mockLadderRepo, mockLadderUserRepo),
            },
            repos: {
                ladder: mockLadderRepo,
            },
        };
    },
    expected: undefined,
});
