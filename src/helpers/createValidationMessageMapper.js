/**
 * Takes in a map of validation constraints to their error messages.
 *
 * Returns a helper function that loops through Sequelize validation errors
 * to produce an error message to display to clients.
 * It only displays a message if it exists in the map;
 * otherwise it will be a generic message.
 *
 * Example)
 *  const getValidationErrorMessage = createValidationMessageMapper({
 *      'user_name|len': 'Username is too short or too long.',
        'user_name|not_unique': 'Username is already taken.',
 *  });
 *
 *  console.log(getValidationErrorMessage({sequelize unique validation error}));
 *  // prints: 'Username is already taken.'
 */
function createValidationMessageMapper(validationMessageMap) {
    return error => {
        if (!error.errors) {
            return 'Something went wrong.';
        }

        const mappedErrors = error.errors.reduce((result, err) => {
            const messageKey = `${err.path}|${err.validatorKey}`;
            const message = validationMessageMap[messageKey];
            if (message) {
                result.push(message);
            }

            return result;
        }, []);

        if (mappedErrors.length === 0) {
            return 'Something went wrong.';
        }

        return mappedErrors.join(' ');
    };
}

module.exports = createValidationMessageMapper;
