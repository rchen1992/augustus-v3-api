const { testQuery } = require('@tests/utils');

testQuery({
    id: 'Create new match',
    query: `
        mutation newMatch($input: NewMatchInput!) {
            newMatch(input: $input) {
                id
                tied
            }
        }
    `,
    variables: {
        input: {
            ladderId: 1,
            user1Id: 1,
            user2Id: 2,
            winnerId: 1,
            loserId: 1,
        },
    },
    context: () => {
        return {
            services: {
                match: {
                    newMatch() {
                        return {
                            match_id: 10,
                            ladder_id: 1,
                            user_1_id: 1,
                            user_2_id: 2,
                            winner_id: 1,
                            loser_id: 1,
                            tied: false,
                        };
                    },
                },
            },
        };
    },
    expected: undefined,
});
