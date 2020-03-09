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

    test('Should be able to get whitelisted and mapped fields with transform', () => {
        const transformVal = 'hello';

        const map = {
            userName: 'user_name',
            transformMe: {
                name: 'transform_plz',
                transform(fieldValue) {
                    return fieldValue + 'world';
                },
            },
        };

        const whitelistMapper = createWhitelistMapperForUpdate(map);

        const result = whitelistMapper({
            userName: 'helloworldo',
            transformMe: transformVal,
            invalidField: 'this should not be included',
        });

        expect(result).toEqual({
            user_name: 'helloworldo',
            transform_plz: transformVal + 'world',
        });
    });

    test('Should be able to get whitelisted and mapped fields with transform validation failing', () => {
        const transformVal = 'hello';

        const map = {
            userName: 'user_name',
            transformMe: {
                name: 'transform_plz',
                transform(fieldValue) {
                    if (fieldValue !== transformVal) {
                        throw new Error('error message');
                    }
                },
            },
        };

        const whitelistMapper = createWhitelistMapperForUpdate(map);

        expect(() => {
            whitelistMapper({
                userName: 'helloworldo',
                transformMe: 'something other than transformVal',
                invalidField: 'this should not be included',
            });
        }).toThrow('error message');
    });
});
