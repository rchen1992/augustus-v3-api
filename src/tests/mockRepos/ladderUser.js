const { mockLadderUsers } = require('@tests/mockData/dataSet');

const MOCK_NEW_LADDER_USER_FIELDS = {
    rating: 1000,
    rating_delta: 0,
    created_at: '2018-12-11 09:39:31',
    updated_at: '2018-10-09 01:00:11',
};

module.exports = {
    getLadderUser(ladderId, userId) {
        return mockLadderUsers.find(
            ({ user_id, ladder_id }) => ladder_id === ladderId && user_id === userId
        );
    },

    createLadderUser(ladderId, userId) {
        return {
            ...MOCK_NEW_LADDER_USER_FIELDS,
            ladder_id: ladderId,
            user_id: userId,
        };
    },

    updateLadderUser(ladderId, userId, fields) {
        const ladderUser = this.getLadderUser(ladderId, userId);
        if (!ladderUser) {
            return null;
        }

        return {
            ...ladderUser,
            ...fields,
        };
    },
};
