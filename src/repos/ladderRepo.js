const { Ladder } = require('@models');

function getAllLadders() {
    return Ladder.findAll();
}

async function getLadderById(ladderId) {
    const ladder = await Ladder.findByPk(ladderId);
    return ladder && ladder.toJSON();
}

module.exports = {
    getAllLadders,
    getLadderById,
};
