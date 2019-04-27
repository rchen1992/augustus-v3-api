const elo = require('@helpers/elo');

describe('Elo helper', () => {
    test('getNewUserRatings - user ratings should change for a win/loss', () => {
        const user1 = {
            user_id: 1,
            rating: 1000,
            rating_delta: 0,
        };

        const user2 = {
            user_id: 2,
            rating: 1000,
            rating_delta: 0,
        };

        const [user1Ratings, user2Ratings] = elo.getNewUserRatings(user1, user2, 1);

        expect(user1Ratings.rating).toBeGreaterThan(user2Ratings.rating);
        expect(user1Ratings.ratingDelta).toBeGreaterThan(0);
        expect(user2Ratings.ratingDelta).toBeLessThan(0);
    });

    test('getNewUserRatings - user ratings should stay the same for a tie', () => {
        const user1 = {
            user_id: 1,
            rating: 1000,
            rating_delta: 0,
        };

        const user2 = {
            user_id: 2,
            rating: 1000,
            rating_delta: 0,
        };

        const [user1Ratings, user2Ratings] = elo.getNewUserRatings(user1, user2, null);

        expect(user1Ratings.rating).toEqual(user2Ratings.rating);
        expect(user1Ratings.ratingDelta).toBe(0);
        expect(user2Ratings.ratingDelta).toBe(0);
    });
});
