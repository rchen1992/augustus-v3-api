const { mockMatches } = require('@tests/mockData/dataSet');
const mockLadderRepo = require('./ladder');
const mockUserRepo = require('./user');

module.exports = {
    getAllMatches() {
        return mockMatches;
    },

    getMatchById(matchId) {
        return mockMatches.find(match => matchId == match.match_id);
    },

    getMatchesByUser(userId) {
        return mockMatches.filter(match => match.user_1_id == userId || match.user_2_id == userId);
    },

    getMatchWithLadder(matchId) {
        const match = this.getMatchById(matchId);
        const ladder = mockLadderRepo.getLadderById(match.ladder_id);
        return {
            ...match,
            ladder,
        };
    },

    getMatchWithWinner(matchId) {
        const match = this.getMatchById(matchId);
        const winner = mockUserRepo.getUserById(match.winner_id);
        return {
            ...match,
            winner,
        };
    },

    getMatchWithLoser(matchId) {
        const match = this.getMatchById(matchId);
        const loser = mockUserRepo.getUserById(match.loser_id);
        return {
            ...match,
            loser,
        };
    },
};
