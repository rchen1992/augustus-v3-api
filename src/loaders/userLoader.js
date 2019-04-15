const DataLoader = require('dataloader');
const { User } = require('@models');
const { orderLoaderResult } = require('./utils');

function createUserLoader() {
    return new DataLoader(async userIds => {
        const users = await User.findAll({ where: { user_id: userIds } });
        console.log('user loader batch: length ', userIds.length);
        return orderLoaderResult(userIds, users, 'user_id');
    });
}

module.exports = {
    createUserLoader,
};
