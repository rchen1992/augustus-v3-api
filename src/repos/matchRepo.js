const { Match } = require('@models');
const connection = require('@database/connection');

function createMatchRepo(loaders) {
    async function _getMatchWithUser(matchId, userIdKey, returnedUserKeyName) {
        const match = await loaders.match.load(matchId);
        if (!match) {
            return null;
        }

        const userId = match[userIdKey];
        const user = userId ? await loaders.user.load(match[userIdKey]) : null;

        return {
            ...match.toJSON(),
            [returnedUserKeyName]: user && user.toJSON(),
        };
    }

    return {
        async getMatches(offset, limit) {
            const matches = await Match.findAll({
                limit,
                offset,
                order: [['created_at', 'DESC']],
            });
            return matches.map(match => match.toJSON());
        },

        async getMatchById(matchId) {
            const match = await loaders.match.load(matchId);
            return match && match.toJSON();
        },

        getMatchesByUser(userId, offset, limit) {
            return connection.query(
                `
                    select * from matches m
                    where m.user_1_id = :userId or m.user_2_id = :userId
                    order by m.created_at desc
                    ${offset === undefined ? '' : 'offset :offset'}
                    ${limit === undefined ? '' : 'limit :limit'}
                `,
                {
                    replacements: { userId, offset, limit },
                    type: connection.QueryTypes.SELECT,
                }
            );
        },

        async countMatchesByUser(userId) {
            const result = await connection.query(
                `
                    select COUNT(*) from matches m
                    where m.user_1_id = :userId or m.user_2_id = :userId
                `,
                {
                    replacements: { userId },
                    type: connection.QueryTypes.SELECT,
                }
            );

            return result[0].count;
        },

        async countMatchesByLadder(ladderId) {
            const result = await connection.query(
                `
                    select COUNT(*) from matches m
                    where m.ladder_id = :ladderId
                `,
                {
                    replacements: { ladderId },
                    type: connection.QueryTypes.SELECT,
                }
            );

            return result[0].count;
        },

        /**
         * Returns matches played by a user in a particular ladder.
         */
        getMatchesByLadderUser(userId, ladderId) {
            return connection.query(
                `
                    select * from matches
                    where (user_1_id = :userId or user_2_id = :userId) and ladder_id = :ladderId
                `,
                {
                    replacements: { userId, ladderId },
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

        getMatchWithUser1(matchId) {
            return _getMatchWithUser(matchId, 'user_1_id', 'user1');
        },

        getMatchWithUser2(matchId) {
            return _getMatchWithUser(matchId, 'user_2_id', 'user2');
        },

        getMatchWithWinner(matchId) {
            return _getMatchWithUser(matchId, 'winner_id', 'winner');
        },

        getMatchWithLoser(matchId) {
            return _getMatchWithUser(matchId, 'loser_id', 'loser');
        },

        async createMatch(
            ladderId,
            user1Id,
            user2Id,
            winnerId = null,
            loserId = null,
            tied = false
        ) {
            const match = await Match.create({
                ladder_id: ladderId,
                user_1_id: user1Id,
                user_2_id: user2Id,
                winner_id: winnerId,
                loser_id: loserId,
                tied,
            });

            return match.toJSON();
        },
    };
}

module.exports = createMatchRepo;
