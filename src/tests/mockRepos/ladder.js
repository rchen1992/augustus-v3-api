const { mockLadders } = require('@tests/mockData/dataSet');

module.exports = {
    getAllLadders() {
        return mockLadders;
    },

    getLadderById(ladderId) {
        return mockLadders.find(ladder => ladderId === ladder.ladder_id);
    },
};
