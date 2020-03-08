const createValidationMessageMapper = require('@helpers/createValidationMessageMapper');
const {
    SEQUELIZE_VALIDATOR_KEY_LENGTH,
    SEQUELIZE_VALIDATOR_KEY_NOT_UNIQUE,
} = require('@constants/sequelizeValidatorKeys');

describe('createValidationMessageMapper helper', () => {
    test('Should be able to get validation message', () => {
        const map = {
            [`user_name|${SEQUELIZE_VALIDATOR_KEY_LENGTH}`]: 'Username is too short or too long.',
            [`user_name|${SEQUELIZE_VALIDATOR_KEY_NOT_UNIQUE}`]: 'Username is already taken.',
        };

        const getValidationMessage = createValidationMessageMapper(map);

        const result = getValidationMessage({
            errors: [
                {
                    path: 'user_name',
                    validatorKey: SEQUELIZE_VALIDATOR_KEY_NOT_UNIQUE,
                },
            ],
        });

        expect(result).toEqual('Username is already taken.');
    });
});
