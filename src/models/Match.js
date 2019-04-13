const Sequelize = require('sequelize');
const createModel = require('./createModel');
const User = require('./User');
const Ladder = require('./Ladder');

module.exports = createModel('match', {
    match_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    ladder_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: Ladder,
            key: 'ladder_id',
        },
    },
    user_1_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    user_2_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    winner_id: {
        type: Sequelize.BIGINT,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    loser_id: {
        type: Sequelize.BIGINT,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    tied: { type: Sequelize.BOOLEAN, allowNull: false },
});
