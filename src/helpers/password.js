const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, 5);
}

function confirmPassword(plaintext, hash) {
    return bcrypt.compareSync(plaintext, hash);
}

module.exports = {
    hashPassword,
    confirmPassword,
};
