const connection = require('@database/connection');

const baseModelOptions = {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
};

function createModel(modelName, initFields, options) {
    return connection.define(modelName, initFields, Object.assign({}, baseModelOptions, options));
}

module.exports = createModel;
