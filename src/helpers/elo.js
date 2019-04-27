const Elo = require('elo-js');

const elo = new Elo();

module.exports = {
    getNewUserRatings(user1, user2, winnerId) {
        let newRatingUser1;
        let newRatingUser2;

        if (!winnerId) {
            newRatingUser1 = elo.ifTies(user1.rating, user2.rating);
            newRatingUser2 = elo.ifTies(user2.rating, user1.rating);
        } else if (user1.user_id === winnerId) {
            newRatingUser1 = elo.ifWins(user1.rating, user2.rating);
            newRatingUser2 = elo.ifLoses(user2.rating, user1.rating);
        } else if (user2.user_id === winnerId) {
            newRatingUser1 = elo.ifLoses(user1.rating, user2.rating);
            newRatingUser2 = elo.ifWins(user2.rating, user1.rating);
        }

        let newRatingUser1Delta = newRatingUser1 - user1.rating;
        let newRatingUser2Delta = newRatingUser2 - user2.rating;

        return [
            { rating: newRatingUser1, ratingDelta: newRatingUser1Delta },
            { rating: newRatingUser2, ratingDelta: newRatingUser2Delta },
        ];
    },
};
