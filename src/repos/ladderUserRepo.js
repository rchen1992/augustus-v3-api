const { LadderUser } = require('@models');

const DEFAULT_START_RATING = 1000;
const DEFAULT_START_RATING_DELTA = 0;

function createLadderUserRepo(loaders) {
    return {
        async createLadderUser(ladderId, userId) {
            const ladderUser = await LadderUser.create({
                ladder_id: ladderId,
                user_id: userId,
                rating: DEFAULT_START_RATING,
                rating_delta: DEFAULT_START_RATING_DELTA,
            });

            return ladderUser.toJSON();
        },
    };
}

module.exports = createLadderUserRepo;
