const syncUser = require('@middleware/syncUser');

/**
 * Mock the userService module with a mock implementation.
 * No need to restore the implementation because all test files
 * in Jest are sandboxed.
 */
jest.mock('@services/userService', () => () => ({
    syncUserFromAuth0({ userId, email, nickname, avatarUrl }) {
        return {
            user_id: userId,
            email,
            nickname,
            avatar_url: avatarUrl,
        };
    },
}));

describe('Middleware - syncUser', () => {
    test('should set current user onto request using user data from headers', async () => {
        const userId = '123';
        const userData = {
            email: 'hello@gmail.com',
            nickname: 'hello',
            avatar_url: 'https://s.gravatar.com/avatar/hello.png',
        };
        const mockReq = {
            headers: {
                userdata: JSON.stringify(userData),
            },
            user: {
                sub: userId,
            },
        };

        await syncUser(mockReq, {}, () => {});

        expect(mockReq.currentUser).toEqual({
            user_id: userId,
            ...userData,
        });
    });
});
