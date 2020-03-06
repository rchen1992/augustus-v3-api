const LadderUsersOrderBy = require('@enums/LadderUsersOrderBy');

function createLadderService(ladderRepo, ladderUserRepo) {
    const cache = {
        usersRankedDesc: {},
    };

    async function getUsersRankedDesc(ladderId) {
        if (!cache.usersRankedDesc[ladderId]) {
            const ladderWithLadderUsers = await ladderRepo.getLadderWithLadderUsers(ladderId);
            cache.usersRankedDesc[ladderId] = ladderWithLadderUsers.ladderUsers.sort(
                (ladderUser1, ladderUser2) => ladderUser2.rating - ladderUser1.rating
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
                return {
                    ...ladderUser,
                    ladder,
                };
            } catch (e) {
                console.log(e);
                throw new Error('An error occurred while creating a ladder.');
            }
        },

        async joinLadder(token, userId) {
            try {
                const ladder = await ladderRepo.getLadderByInviteToken(token);
                const ladderUser = await ladderUserRepo.createLadderUser(ladder.ladder_id, userId);
                return {
                    ...ladderUser,
                    ladder,
                };
            } catch (e) {
                console.log(e);
                throw new Error('An error occurred while attempting to join a ladder.');
            }
        },

        async getUserRank(ladderId, userId) {
            const usersRankedDesc = await getUsersRankedDesc(ladderId);
            const rankIndex = usersRankedDesc.findIndex(user => user.user_id === userId);
            return rankIndex + 1;
        },

        async getLadderWithLadderUsers(ladderId, orderBy) {
            if (orderBy === LadderUsersOrderBy.rank_DESC) {
                return getUsersRankedDesc(ladderId);
            }

            const ladder = await ladderRepo.getLadderWithLadderUsers(ladderId);
            return ladder.ladderUsers;
        },
    };
}

module.exports = createLadderService;
