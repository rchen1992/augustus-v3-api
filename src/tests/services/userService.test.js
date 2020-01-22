const createUserService = require('@services/userService');
const mockUserRepo = require('@tests/mockRepos/user');
const { mockUsers } = require('@tests/mockData/dataSet');

describe('User Service', () => {
    test('should be able to update existing user from Auth0', async () => {
        const mockUser = {
            userId: mockUsers[0].user_id,
            email: 'updated_email',
            nickname: mockUsers[0].user_name,
            avatarUrl: mockUsers[0].avatar_url,
        };

        const updateUserSpy = jest.spyOn(mockUserRepo, 'updateUser');

        const service = createUserService(mockUserRepo);
        const result = await service.syncUserFromAuth0(mockUser);

        expect(updateUserSpy).toHaveBeenCalled();
        expect(result).toEqual({
            ...mockUsers[0],
            email: mockUser.email,
        });
    });

    test('should be able to create a new user from Auth0', async () => {
        const mockUser = {
            userId: '12345',
            email: 'hello@gmail.com',
            nickname: 'hello',
            avatarUrl: 'https://s.gravatar.com/avatar/hello.png',
        };

        const createUserSpy = jest.spyOn(mockUserRepo, 'createUser');

        const service = createUserService(mockUserRepo);
        const result = await service.syncUserFromAuth0(mockUser);

        expect(createUserSpy).toHaveBeenCalled();
        expect(result).toEqual({
            user_id: mockUser.userId,
            email: mockUser.email,
            user_name: mockUser.nickname,
            avatar_url: mockUser.avatarUrl,
        });
    });
});
