const { Ladder } = require('@models');
const faker = require('faker');

function generateInviteToken() {
    return faker.random.alphaNumeric(16);
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

        async getLadderByInviteToken(token) {
            const ladder = await Ladder.findOne({
                where: {
                    invite_token: token,
                },
            });

            return ladder && ladder.toJSON();
        },

        async getLadderWithLadderUsers(ladderId) {
            const ladder = await loaders.ladder.load(ladderId);
            if (!ladder) {
                return null;
            }

            /**
             * Getting users through relationship will put
             * `ladder_user` on each of the user objects.
             *
             * We need to map it so that ladderUser is the root object
             * and user is a nested field inside ladderUser, instead
             * of the other way around.
             */
            const users = await ladder.getUsers();
            const ladderUsers = users.map(user => {
                const exportedUser = user.toJSON();
                return {
                    ...exportedUser.ladder_user,
                    user: exportedUser,
                    ladder: ladder,
                };
            });

            return {
                ...ladder.toJSON(),
                ladderUsers,
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
