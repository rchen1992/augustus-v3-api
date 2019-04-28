const { createUserLoader, createUserByNameLoader } = require('./userLoader');
const { createMatchLoader } = require('./matchLoader');
const { createLadderLoader } = require('./ladderLoader');

function createLoaders() {
    return {
        user: createUserLoader(),
        userByName: createUserByNameLoader(),
        match: createMatchLoader(),
        ladder: createLadderLoader(),
    };
}

module.exports = createLoaders;
