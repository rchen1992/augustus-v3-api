const elo = require('@helpers/elo');

function createMatchService(matchRepo, ladderUserRepo) {
    return {
        async newMatch(ladderId, user1Id, user2Id, winnerId, loserId) {
            const isTie = !winnerId && !loserId;

            if (user1Id === user2Id) {
                throw new Error('Cannot log match against yourself.');
            }

            if (!isTie) {
                if ((winnerId && !loserId) || (loserId && !winnerId)) {
                    throw new Error('Only one of winner or loser were specified.');
                }

                if (winnerId === loserId) {
                    throw new Error('Winner and loser cannot be the same user.');
                }

                if (
                    (user1Id !== winnerId && user1Id !== loserId) ||
                    (user2Id !== winnerId && user2Id !== loserId)
                ) {
                    throw new Error('Provided users must match either the winner or loser');
                }
            }

            let ladderUser1 = await ladderUserRepo.getLadderUser(ladderId, user1Id);
            let ladderUser2 = await ladderUserRepo.getLadderUser(ladderId, user2Id);

            if (!ladderUser1 || !ladderUser2) {
                throw new Error('Ladder user does not exist.');
            }

            try {
                const match = await matchRepo.createMatch(
                    ladderId,
                    user1Id,
                    user2Id,
                    winnerId,
                    loserId,
                    isTie
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
            } catch (err) {
                console.log(err);
                throw new Error('Something went wrong while trying to log a match.');
            }
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
