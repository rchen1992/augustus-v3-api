const createWhitelistMapperForUpdate = require('@helpers/createWhitelistMapperForUpdate');

describe('createWhitelistMapperForUpdate helper', () => {
    test('Should be able to get whitelisted and mapped fields', () => {
        const map = {
            userName: 'user_name',
            someRandomField: 'internal_name_random_field',
            whatever: 'woteverz',
        };

        const whitelistMapper = createWhitelistMapperForUpdate(map);

        const result = whitelistMapper({
            userName: 'helloworldo',
            someRandomField: 'super random',
            invalidField: 'this should not be included',
        });

        expect(result).toEqual({
            user_name: 'helloworldo',
            internal_name_random_field: 'super random',
        });
    });
});
