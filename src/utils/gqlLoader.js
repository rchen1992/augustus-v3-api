const fs = require('fs');
const path = require('path');

const loadGQLFile = type => {
    const filePath = path.join(__dirname, '..', type);
    console.log(filePath);
    return fs.readFileSync(filePath, 'utf-8');
};

module.exports = loadGQLFile;
