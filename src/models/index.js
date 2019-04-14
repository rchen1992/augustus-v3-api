const User = require('./User');
const Ladder = require('./Ladder');
const LadderUser = require('./LadderUser');
const Match = require('./Match');

User.belongsToMany(Ladder, { through: LadderUser, foreignKey: 'user_id' });
Ladder.belongsToMany(User, { through: LadderUser, foreignKey: 'ladder_id' });

module.exports = {
    User,
    Ladder,
    LadderUser,
    Match,
};
