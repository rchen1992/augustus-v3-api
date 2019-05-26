const createMatchService = require('@services/matchService');
const mockMatchRepo = require('@tests/mockRepos/match');

describe('Match Service', () => {
    test('should be able to get user match stats', async () => {
        const service = createMatchService(mockMatchRepo);
        const stats = await service.getLadderUserMatchStats(1, 1);
        expect(stats).toMatchSnapshot();
    });
});
