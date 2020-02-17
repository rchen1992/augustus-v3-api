const LadderUsersOrderBy = require('@enums/LadderUsersOrderBy');

function createLadderService(ladderRepo, ladderUserRepo) {
    const cache = {
        usersRankedDesc: {},
    };

    async function getUsersRankedDesc(ladderId) {
        if (!cache.usersRankedDesc[ladderId]) {
            const ladderWithUsers = await ladderRepo.getLadderWithUsers(ladderId);
            cache.usersRankedDesc[ladderId] = ladderWithUsers.users.sort(
                (user1, user2) => user2.ladder_user.rating - user1.ladder_user.rating
            );
        }

        return cache.usersRankedDesc[ladderId];
    }

    return {
        getUsersRankedDesc,

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
            const usersRankedDesc = await getUsersRankedDesc(ladderId);
            const rankIndex = usersRankedDesc.findIndex(user => user.user_id === userId);
            return rankIndex + 1;
        },

        async getLadderWithUsers(ladderId, orderBy) {
            if (orderBy === LadderUsersOrderBy.rank_DESC) {
                return getUsersRankedDesc(ladderId);
            }

            const ladder = await ladderRepo.getLadderWithUsers(ladderId);
            return ladder.users;
        },
    };
}

module.exports = createLadderService;
