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

        async getLadderWithUsers(ladderId) {
            const ladder = await loaders.ladder.load(ladderId);
            if (!ladder) {
                return null;
            }

            const users = await ladder.getUsers();
            return {
                ...ladder.toJSON(),
                users: users.map(user => user.toJSON()),
            };
        },

        async getLadderWithMatches(ladderId) {
            const ladder = await loaders.ladder.load(ladderId);
            if (!ladder) {
                return null;
            }

            const matches = await ladder.getMatches();
            return {
                ...ladder.toJSON(),
                matches: matches.map(match => match.toJSON()),
            };
        },
    };
}

module.exports = createLadderRepo;
