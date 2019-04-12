const Sequelize = require('sequelize');
const createModel = require('./createModel');

module.exports = createModel('user', {
    user_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.CITEXT, unique: true },
    password: { type: Sequelize.TEXT },
    user_name: { type: Sequelize.CITEXT, unique: true },
    avatar_url: { type: Sequelize.TEXT, unique: true },
});
