function createLadderService(ladderRepo, ladderUserRepo) {
    return {
        async newLadder(ladderName, userId) {
            const trimmedLadderName = ladderName.trim();
            if (!trimmedLadderName) {
                throw new Error('Ladder name cannot be empty.');
            }

            try {
                const ladder = await ladderRepo.createLadder(trimmedLadderName);
                const ladderUser = await ladderUserRepo.createLadderUser(ladder.ladder_id, userId);
                ladder.ladder_user = ladderUser;
                return ladder;
            } catch (e) {
                console.log(e);
                throw new Error('An error occurred while creating a ladder.');
            }
        },

        async getUserRank(ladderId, userId) {
            const ladderWithUsers = await ladderRepo.getLadderWithUsers(ladderId);
            const sortedByRatingDesc = ladderWithUsers.users.sort(
                (user1, user2) => user2.ladder_user.rating - user1.ladder_user.rating
            );
            const rankIndex = sortedByRatingDesc.findIndex(user => user.user_id === userId);
            return rankIndex + 1;
        },
    };
}

module.exports = createLadderService;
