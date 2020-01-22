const { mockUsers, mockLadderUsers } = require('@tests/mockData/dataSet');
const mockLadderRepo = require('./ladder');

module.exports = {
    getAllUsers() {
        return mockUsers;
    },

    getUserById(userId) {
        return mockUsers.find(user => userId == user.user_id);
    },

    getUserWithLadders(userId) {
        const user = this.getUserById(userId);
        const ladderUsers = mockLadderUsers.filter(ladderUser => ladderUser.user_id === userId);
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

    generateUniqueUsername(userName) {
        return userName;
    },

    createUser({ userId, userName, email, avatarUrl }) {
        return {
            user_id: userId,
            user_name: userName,
            email,
            avatar_url: avatarUrl,
        };
    },

    updateUser(userId, fields) {
        const user = this.getUserById(userId);
        return {
            ...user,
            ...fields,
        };
    },
};
