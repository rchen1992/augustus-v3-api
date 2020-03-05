const mockLadderRepo = require('@tests/mockRepos/ladder');
const mockLadderUserRepo = require('@tests/mockRepos/ladderUser');
const createLadderService = require('@services/ladderService');
const { testQuery } = require('@tests/utils');

testQuery({
    id: "Get all of a ladder's users",
    query: `
        {
            ladder(id: 1) {
                id
                ladderUsers {
                    id
                    rating
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
