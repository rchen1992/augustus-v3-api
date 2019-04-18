const { mockUsers, mockLadderUsers } = require('@tests/mockData/dataSet');
const mockLadderRepo = require('./ladder');

module.exports = {
    getAllUsers() {
        return mockUsers;
    },

    getUserById(userId) {
        return mockUsers.find(user => userId === user.user_id);
    },

    getUserWithLadders(userId) {
        const user = getUserById(userId);
        const ladderUsers = mockLadderUsers.find(ladderUser => ladderUser.user_id === userId);
        const ladders = ladderUsers.map(ladderUser => {
            const ladder = mockLadderRepo.getLadderById(ladderUser.ladder_id);
            return {
                ...ladder,
                ladder_user: ladderUser,
            };
        });

        return {
            ...user,
            ladders,
        };
    },
};
