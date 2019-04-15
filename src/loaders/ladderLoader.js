const DataLoader = require('dataloader');
const { Ladder } = require('@models');
const { orderLoaderResult } = require('./utils');

function createLadderLoader() {
    return new DataLoader(async ladderIds => {
        const ladders = await Ladder.findAll({ where: { ladder_id: ladderIds } });
        console.log('ladder loader batch: length ', ladderIds.length);
        return orderLoaderResult(ladderIds, ladders, 'ladder_id');
    });
}

module.exports = {
    createLadderLoader,
};
