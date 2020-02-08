const createMatchService = require('@services/matchService');
const mockMatchRepo = require('@tests/mockRepos/match');
const mockLadderUserRepo = require('@tests/mockRepos/ladderUser');

describe('Match Service', () => {
    test('should be able to get user match stats', async () => {
        const service = createMatchService(mockMatchRepo);
        const stats = await service.getLadderUserMatchStats('1', 1);
        expect(stats).toMatchSnapshot();
    });

    test('should be able to get create match', async () => {
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        const match = await service.newMatch(1, '1', '2', '1', '2');
        expect(match).toMatchSnapshot();
    });

    test('should be able to get create match with a tie', async () => {
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        const match = await service.newMatch(1, '1', '2', null, null);
        expect(match).toMatchSnapshot();
    });

    test('should not be able to create match against yourself', async () => {
        expect.assertions(1);
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        return expect(service.newMatch(1, '1', '1', '1', '2')).rejects.toMatchSnapshot();
    });

    test('should not be able to create match with only a winner and no loser', async () => {
        expect.assertions(1);
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        return expect(service.newMatch(1, '1', '2', '1', null)).rejects.toMatchSnapshot();
    });

    test('should not be able to create match with only a loser and no winner', async () => {
        expect.assertions(1);
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        return expect(service.newMatch(1, '1', '2', null, '2')).rejects.toMatchSnapshot();
    });

    test('should not be able to create match if winner and loser are the same user', async () => {
        expect.assertions(1);
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        return expect(service.newMatch(1, '1', '2', '1', '1')).rejects.toMatchSnapshot();
    });

    test('should not be able to create match if winner and loser are the same user', async () => {
        expect.assertions(1);
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        return expect(service.newMatch(1, '1', '2', '1', '1')).rejects.toMatchSnapshot();
    });

    test("should not be able to create match if users don't match the winner or loser", async () => {
        expect.assertions(1);
        const service = createMatchService(mockMatchRepo, mockLadderUserRepo);
        return expect(service.newMatch(1, '1', '2', '3', '4')).rejects.toMatchSnapshot();
    });
});
