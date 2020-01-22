const createLadderService = require('@services/ladderService');
const mockLadderRepo = require('@tests/mockRepos/ladder');

describe('Ladder Service', () => {
    test('should be able to calculate user rank', async () => {
        const service = createLadderService(mockLadderRepo);
        const ladderId = 2;

        let user1Rank = await service.getUserRank(ladderId, '1');
        expect(user1Rank).toBe(4);

        let user2Rank = await service.getUserRank(ladderId, '2');
        expect(user2Rank).toBe(2);

        let user4Rank = await service.getUserRank(ladderId, '4');
        expect(user4Rank).toBe(1);

        let user5Rank = await service.getUserRank(ladderId, '5');
        expect(user5Rank).toBe(3);
    });
});
