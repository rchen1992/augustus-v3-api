const Sequelize = require('sequelize');
const createModel = require('./createModel');
const User = require('./User');
const Ladder = require('./Ladder');

module.exports = createModel('ladder_user', {
    user_id: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    ladder_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        references: {
            model: Ladder,
            key: 'ladder_id',
        },
    },
    rating: { type: Sequelize.INTEGER, allowNull: false },
    rating_delta: { type: Sequelize.INTEGER, allowNull: false },
});
