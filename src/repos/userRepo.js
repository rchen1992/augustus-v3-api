const { User, Ladder } = require('@models');

function getAllUsers() {
    return User.findAll();
}

async function getUserById(userId) {
    const user = await User.findByPk(userId);
    return user && user.toJSON();
}

async function getUserWithLadders(userId) {
    const user = await User.findByPk(userId, {
        include: [Ladder],
    });

    return user && user.toJSON();
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserWithLadders,
};
