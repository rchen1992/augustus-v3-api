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
 *
 * You can also provide an object which specifies the internal field `name`
 * along with a `transform` function, which you can use to apply any logic
 * to the given value, including validation checks.
 * Example)
 *  const whitelistMapper = createWhitelistMapperForUpdate({
 *      userName: {
 *          name: 'user_name',
 *          transform(userName) {
 *              const trimmed = userName.trim();
 *              if (trimmed.length === 0) throw new Error('no username');
 *              return trimmed;
 *          }
 *      }
 *  });
 */
function createWhitelistMapperForUpdate(apiToModelFieldMap) {
    const updateableFields = Object.keys(apiToModelFieldMap);

    return fields => {
        const whitelistedFields = pick(fields, updateableFields);

        const mappedFields = Object.keys(whitelistedFields).reduce((result, fieldKey) => {
            // Object or string
            let mappedKey = apiToModelFieldMap[fieldKey];
            let fieldValue = fields[fieldKey];
            if (typeof mappedKey === 'object') {
                if (!mappedKey.name) {
                    throw new Error(
                        'Must provide mapped internal field name if using object format.'
                    );
                }

                if (mappedKey.transform) {
                    fieldValue = mappedKey.transform(fieldValue);
                }

                mappedKey = mappedKey.name;
            }

            result[mappedKey] = fieldValue;
            return result;
        }, {});

        return mappedFields;
    };
}

module.exports = createWhitelistMapperForUpdate;
