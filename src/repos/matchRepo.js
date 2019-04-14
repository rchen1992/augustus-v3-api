const { Match } = require('@models');
const connection = require('@database/connection');

function getAllMatches() {
    return Match.findAll();
}

async function getMatchById(matchId) {
    const match = await Match.findByPk(matchId);
    return match && match.toJSON();
}

function getMatchesByUser(userId) {
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
}

module.exports = {
    getAllMatches,
    getMatchById,
    getMatchesByUser,
};
