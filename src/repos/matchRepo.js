const { Match } = require('@models');
const connection = require('@database/connection');

function createMatchRepo(loaders) {
    async function _getMatchWithUser(matchId, userIdKey, returnedUserKeyName) {
        const match = await loaders.match.load(matchId);
        if (!match) {
            return null;
        }

        const user = await loaders.user.load(match[userIdKey]);
        return {
            ...match.toJSON(),
            [returnedUserKeyName]: user && user.toJSON(),
        };
    }

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

            const ladder = await loaders.ladder.load(match.ladder_id);
            return {
                ...match.toJSON(),
                ladder: ladder && ladder.toJSON(),
            };
        },

        getMatchWithWinner(matchId) {
            return _getMatchWithUser(matchId, 'winner_id', 'winner');
        },

        getMatchWithLoser(matchId) {
            return _getMatchWithUser(matchId, 'loser_id', 'loser');
        },
    };
}

module.exports = createMatchRepo;
