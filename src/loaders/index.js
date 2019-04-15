const { createUserLoader } = require('./userLoader');
const { createMatchLoader } = require('./matchLoader');
const { createLadderLoader } = require('./ladderLoader');

function createLoaders() {
    return {
        user: createUserLoader(),
        match: createMatchLoader(),
        ladder: createLadderLoader(),
    };
}

module.exports = createLoaders;
