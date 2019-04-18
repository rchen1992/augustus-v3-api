const { mockMatches } = require('@tests/mockData/dataSet');

module.exports = {
    getAllMatches() {
        return mockMatches;
    },

    getMatchById(matchId) {
        return mockMatches.find(match => matchId == match.match_id);
    },
};
