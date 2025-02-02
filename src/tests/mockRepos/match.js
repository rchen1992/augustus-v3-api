const { mockMatches } = require('@tests/mockData/dataSet');
const mockLadderRepo = require('./ladder');
const mockUserRepo = require('./user');
const { applyPagination, sortByDate } = require('@tests/utils');

function _getMatchesPaginated(matches, offset, limit) {
    return applyPagination(sortByDate(matches), offset, limit);
}

module.exports = {
    getMatches(offset, limit) {
        return _getMatchesPaginated(mockMatches, offset, limit);
    },

    getMatchById(matchId) {
        return mockMatches.find(match => matchId == match.match_id);
    },

    getMatchesByUser(userId, offset, limit) {
        const matches = mockMatches.filter(
            match => match.user_1_id == userId || match.user_2_id == userId
        );
        return _getMatchesPaginated(matches, offset, limit);
    },

    countMatchesByUser(userId) {
        return this.getMatchesByUser(userId).length;
    },

    countMatchesByLadder(ladderId) {
        const ladder = mockLadderRepo.getLadderWithMatches(ladderId);
        return ladder.matches.length;
    },

    getMatchesByLadderUser(userId, ladderId) {
        return this.getMatchesByUser(userId).filter(match => match.ladder_id == ladderId);
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

    createMatch(ladderId, user1Id, user2Id, winnerId = null, loserId = null, tied = false) {
        return {
            match_id: 1,
            ladder_id: ladderId,
            user_1_id: user1Id,
            user_2_id: user2Id,
            winner_id: winnerId,
            loser_id: loserId,
            tied,
        };
    },
};
