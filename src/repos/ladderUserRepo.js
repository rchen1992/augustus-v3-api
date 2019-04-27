const { LadderUser } = require('@models');

const DEFAULT_START_RATING = 1000;
const DEFAULT_START_RATING_DELTA = 0;

function _getLadderUser(ladderId, userId) {
    return LadderUser.findOne({
        where: {
            ladder_id: ladderId,
            user_id: userId,
        },
    });
}

function createLadderUserRepo(loaders) {
    return {
        async getLadderUser(ladderId, userId) {
            const ladderUser = await _getLadderUser(ladderId, userId);
            return ladderUser && ladderUser.toJSON();
        },

        async createLadderUser(ladderId, userId) {
            const ladderUser = await LadderUser.create({
                ladder_id: ladderId,
                user_id: userId,
                rating: DEFAULT_START_RATING,
                rating_delta: DEFAULT_START_RATING_DELTA,
            });

            return ladderUser.toJSON();
        },

        async updateLadderUser(ladderId, userId, fields) {
            const ladderUser = await _getLadderUser(ladderId, userId);
            if (!ladderUser) {
                return null;
            }

            await ladderUser.update(fields);
            return ladderUser.toJSON();
        },
    };
}

module.exports = createLadderUserRepo;
