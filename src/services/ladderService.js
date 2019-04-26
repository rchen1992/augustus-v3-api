function createLadderService(ladderRepo, ladderUserRepo) {
    return {
        async newLadder(ladderName, userId) {
            const ladder = await ladderRepo.createLadder(ladderName);
            const ladderUser = await ladderUserRepo.createLadderUser(ladder.ladder_id, userId);
            ladder.ladder_user = ladderUser;
            return ladder;
        },
    };
}

module.exports = createLadderService;
