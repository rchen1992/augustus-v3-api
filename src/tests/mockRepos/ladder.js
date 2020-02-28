const { mockLadders, mockMatches, mockLadderUsers } = require('@tests/mockData/dataSet');
const mockUserRepo = require('./user');
const { applyPagination, sortByDate } = require('@tests/utils');

module.exports = {
    getAllLadders() {
        return mockLadders;
    },

    getLadderById(ladderId) {
        return mockLadders.find(ladder => ladderId == ladder.ladder_id);
    },

    getLadderByInviteToken(token) {
        return mockLadders.find(ladder => token == ladder.invite_token);
    },

    getLadderWithUsers(ladderId) {
        const ladder = this.getLadderById(ladderId);
        const ladderUsers = mockLadderUsers.filter(ladderUser => ladderUser.ladder_id === ladderId);
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

    getLadderWithMatches(ladderId, offset, limit) {
        const ladder = this.getLadderById(ladderId);
        const matches = mockMatches.filter(match => match.ladder_id == ladderId);
        const sorted = sortByDate(matches);
        const paginated = applyPagination(sorted, offset, limit);

        return {
            ...ladder,
            matches: paginated,
        };
    },
};
