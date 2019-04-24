const { mockLadders, mockMatches } = require('@tests/mockData/dataSet');
const mockUserRepo = require('./user');

module.exports = {
    getAllLadders() {
        return mockLadders;
    },

    getLadderById(ladderId) {
        return mockLadders.find(ladder => ladderId == ladder.ladder_id);
    },

    getLadderWithUsers(ladderId) {
        const ladder = this.getLadderById(ladderId);
        const ladderUsers = mockLadderUsers.filter(
            ladderUser => ladderUser.ladder_id === ladder_id
        );
        const users = ladderUsers.map(ladderUser => {
            const user = mockUserRepo.getUserById(ladderUser.user_id);
            return {
                ...user,
                ladder_user: ladderUser,
            };
        });

        return {
            ...ladder,
            users,
        };
    },

    getLadderWithMatches(ladderId) {
        const ladder = this.getLadderById(ladderId);
        const matches = mockMatches.filter(match => match.ladder_id == ladderId);
        return {
            ...ladder,
            matches,
        };
    },
};
