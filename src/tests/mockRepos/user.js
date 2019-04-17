const { users } = require('@tests/mockData/dataSet');

module.exports = {
    getAllUsers() {
        return users;
    },

    getUserById(userId) {
        return users.find(user => userId === user.user_id);
    },

    getUserWithLadders(userId) {
        const user = getUserById(userId);
        // TODO: get user ladders
    },
};
