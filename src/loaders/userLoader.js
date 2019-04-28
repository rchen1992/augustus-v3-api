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

function createUserByNameLoader() {
    return new DataLoader(async userNames => {
        const users = await User.findAll({ where: { user_name: userNames } });
        console.log('user by name loader batch: length ', userNames.length);
        return orderLoaderResult(userNames, users, 'user_name');
    });
}

module.exports = {
    createUserLoader,
    createUserByNameLoader,
};
