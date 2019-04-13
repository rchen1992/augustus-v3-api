const Sequelize = require('sequelize');
const createModel = require('./createModel');

module.exports = createModel('ladder', {
    ladder_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    ladder_name: { type: Sequelize.TEXT, allowNull: false },
    invite_token: { type: Sequelize.TEXT, allowNull: false },
});
