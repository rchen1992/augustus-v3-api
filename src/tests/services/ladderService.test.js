const createLadderService = require('@services/ladderService');
const mockLadderRepo = require('@tests/mockRepos/ladder');
const mockLadderUserRepo = require('@tests/mockRepos/ladderUser');
const LadderUsersOrderBy = require('@enums/LadderUsersOrderBy');

describe('Ladder Service', () => {
    let service;

    beforeEach(() => {
        service = createLadderService(mockLadderRepo, mockLadderUserRepo);
    });

    test('should be able to calculate user rank', async () => {
        const ladderId = 2;

        const user1Rank = await service.getUserRank(ladderId, '1');
        expect(user1Rank).toBe(4);

        const user2Rank = await service.getUserRank(ladderId, '2');
        expect(user2Rank).toBe(2);

        const user4Rank = await service.getUserRank(ladderId, '4');
        expect(user4Rank).toBe(1);

        const user5Rank = await service.getUserRank(ladderId, '5');
        expect(user5Rank).toBe(3);
    });

    test('should be able to get ladder users sorted by rank desc', async () => {
        const ladderId = 2;
        const rankedUsers = await service.getLadderWithLadderUsers(
            ladderId,
            LadderUsersOrderBy.rank_DESC
        );

        expect(rankedUsers).toMatchSnapshot();
    });
});
