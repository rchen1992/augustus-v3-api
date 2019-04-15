const { Ladder } = require('@models');

function createLadderRepo(loaders) {
    return {
        async getAllLadders() {
            const ladders = await Ladder.findAll();
            return ladders.map(ladder => ladder.toJSON());
        },

        async getLadderById(ladderId) {
            const ladder = await loaders.ladder.load(ladderId);
            return ladder && ladder.toJSON();
        },
    };
}

module.exports = createLadderRepo;
