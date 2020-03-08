const Sequelize = require('sequelize');
const createModel = require('./createModel');

const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 20;

module.exports = createModel('user', {
    user_id: { type: Sequelize.STRING(128), primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.CITEXT, unique: true },
    user_name: {
        type: Sequelize.CITEXT,
        unique: true,
        validate: {
            notEmpty: true,
            len: [USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH],
        },
    },
    avatar_url: { type: Sequelize.TEXT, unique: true },
});
