const { Match } = require('@models');
const connection = require('@database/connection');

function createMatchRepo(loaders) {
    return {
        async getAllMatches() {
            const matches = await Match.findAll();
            return matches.map(match => match.toJSON());
        },

        async getMatchById(matchId) {
            const match = await loaders.match.load(matchId);
            return match && match.toJSON();
        },

        getMatchesByUser(userId) {
            return connection.query(
                `
                        select * from matches m
                        where m.user_1_id = :userId or m.user_2_id = :userId
                        order by m.created_at desc
                    `,
                {
                    replacements: { userId },
                    type: connection.QueryTypes.SELECT,
                }
            );
        },

        async getMatchWithLadder(matchId) {
            const match = await loaders.match.load(matchId);
            if (!match) {
                return null;
            }

            const ladder = await match.getLadder();
            return {
                ...match.toJSON(),
                ladder: ladder && ladder.toJSON(),
            };
        },
    };
}

module.exports = createMatchRepo;
