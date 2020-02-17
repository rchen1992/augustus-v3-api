const { Ladder } = require('@models');
const faker = require('faker');

function generateInviteToken() {
    return faker.random.alphaNumeric(8);
}

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

        async getLadderWithMatches(ladderId, offset, limit) {
            const ladder = await loaders.ladder.load(ladderId);
            if (!ladder) {
                return null;
            }

            const matches = await ladder.getMatches({
                offset,
                limit,
                order: [['created_at', 'DESC']],
            });

            return {
                ...ladder.toJSON(),
                matches: matches.map(match => match.toJSON()),
            };
        },

        async createLadder(ladderName) {
            const ladder = await Ladder.create({
                ladder_name: ladderName,
                invite_token: generateInviteToken(),
            });

            return ladder.toJSON();
        },
    };
}

module.exports = createLadderRepo;
