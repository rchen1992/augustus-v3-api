const { pick } = require('lodash');

/**
 * Takes in a map of API field names to internal model field names.
 *
 * Returns a helper function that both whitelists the updateable fields and
 * maps them to their internal name.
 *
 * Example)
 *  const whitelistMapper = createWhitelistMapperForUpdate({
 *      userName: 'user_name'
 *  });
 *
 *  const fields = whitelistMapper({ userName: 'helloworld', invalidField: 'yolo });
 *  // result will be { user_name: 'helloworld' }
 */
function createWhitelistMapperForUpdate(apiToModelFieldMap) {
    const updateableFields = Object.keys(apiToModelFieldMap);

    return fields => {
        const whitelistedFields = pick(fields, updateableFields);
        const mappedFields = Object.keys(whitelistedFields).reduce((result, fieldKey) => {
            const mappedKey = apiToModelFieldMap[fieldKey];
            result[mappedKey] = fields[fieldKey];
            return result;
        }, {});

        return mappedFields;
    };
}

module.exports = createWhitelistMapperForUpdate;
