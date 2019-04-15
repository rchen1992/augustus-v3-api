const DataLoader = require('dataloader');
const { Match } = require('@models');
const { orderLoaderResult } = require('./utils');

function createMatchLoader() {
    return new DataLoader(async matchIds => {
        const matches = await Match.findAll({ where: { match_id: matchIds } });
        console.log('match loader batch: length ', matchIds.length);
        return orderLoaderResult(matchIds, matches, 'match_id');
    });
}

module.exports = {
    createMatchLoader,
};
