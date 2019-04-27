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

    getMatchWithUser1(matchId) {
        return this._getMatchWithUser(matchId, 'user_1_id', 'user1');
    },

    getMatchWithUser2(matchId) {
        return this._getMatchWithUser(matchId, 'user_2_id', 'user2');
    },

    getMatchWithWinner(matchId) {
        return this._getMatchWithUser(matchId, 'winner_id', 'winner');
    },

    getMatchWithLoser(matchId) {
        return this._getMatchWithUser(matchId, 'loser_id', 'loser');
    },

    _getMatchWithUser(matchId, userIdKey, returnedUserKeyName) {
        const match = this.getMatchById(matchId);
        const user = mockUserRepo.getUserById(match[userIdKey]);
        return {
            ...match,
            [returnedUserKeyName]: user,
        };
    },
};
