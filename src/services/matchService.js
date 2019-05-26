const elo = require('@helpers/elo');

function createMatchService(matchRepo, ladderUserRepo) {
    return {
        async newMatch(ladderId, user1Id, user2Id, winnerId, loserId) {
            let ladderUser1 = await ladderUserRepo.getLadderUser(ladderId, user1Id);
            let ladderUser2 = await ladderUserRepo.getLadderUser(ladderId, user2Id);

            if (!ladderUser1 || !ladderUser2) {
                return null;
            }

            const match = await matchRepo.createMatch(
                ladderId,
                user1Id,
                user2Id,
                winnerId,
                loserId
            );

            const [user1Ratings, user2Ratings] = elo.getNewUserRatings(
                ladderUser1,
                ladderUser2,
                winnerId
            );

            await ladderUserRepo.updateLadderUser(ladderId, user1Id, {
                rating: user1Ratings.rating,
                rating_delta: user1Ratings.ratingDelta,
            });

            await ladderUserRepo.updateLadderUser(ladderId, user2Id, {
                rating: user2Ratings.rating,
                rating_delta: user2Ratings.ratingDelta,
            });

            return match;
        },

        async getLadderUserMatchStats(userId, ladderId) {
            const matches = await matchRepo.getMatchesByLadderUser(userId, ladderId);
            return {
                matchCount: matches.length,
                winCount: matches.filter(match => match.winner_id === userId).length,
                lossCount: matches.filter(match => match.loser_id === userId).length,
                tieCount: matches.filter(match => match.tied === true).length,
            };
        },
    };
}

module.exports = createMatchService;
