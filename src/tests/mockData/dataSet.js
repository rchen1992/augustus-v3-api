const mockUsers = [
    {
        user_id: '1',
        email: 'mjurczak0@epa.gov',
        user_name: 'cblanko0',
        avatar_url: 'https://robohash.org/solutaeaut.bmp?size=50x50&set=set1',
        created_at: '2018-09-25 03:08:51',
        updated_at: '2018-07-12 05:22:33',
    },
    {
        user_id: '2',
        email: 'swoodyatt1@storify.com',
        user_name: 'csaye1',
        avatar_url: 'https://robohash.org/nesciuntnobismagni.png?size=50x50&set=set1',
        created_at: '2018-08-01 19:26:23',
        updated_at: '2018-07-14 22:48:36',
    },
    {
        user_id: '3',
        email: 'lmckniely2@berkeley.edu',
        user_name: 'cburchell2',
        avatar_url: 'https://robohash.org/cupiditatesedfugiat.jpg?size=50x50&set=set1',
        created_at: '2018-09-13 15:51:54',
        updated_at: '2019-04-06 09:37:00',
    },
    {
        user_id: '4',
        email: 'gbanat3@typepad.com',
        user_name: 'etappor3',
        avatar_url: 'https://robohash.org/molestiaeinciduntlaboriosam.bmp?size=50x50&set=set1',
        created_at: '2019-01-01 16:47:52',
        updated_at: '2018-04-20 21:04:19',
    },
    {
        user_id: '5',
        email: 'sdennistoun4@wikimedia.org',
        user_name: 'selcott4',
        avatar_url: 'https://robohash.org/voluptatumundemodi.bmp?size=50x50&set=set1',
        created_at: '2018-08-16 17:09:23',
        updated_at: '2018-08-18 01:01:35',
    },
];

const mockLadders = [
    {
        ladder_id: 1,
        ladder_name: 'Tagpad',
        invite_token: 'tRJcyp2Jkr13',
        created_at: '2018-12-11 09:39:31',
        updated_at: '2018-10-09 01:00:11',
    },
    {
        ladder_id: 2,
        ladder_name: 'Kamba',
        invite_token: '3dV982mqxe4',
        created_at: '2018-07-24 06:11:55',
        updated_at: '2018-11-30 11:49:27',
    },
    {
        ladder_id: 3,
        ladder_name: 'Skyvu',
        invite_token: '45m5WON',
        created_at: '2019-03-09 02:50:35',
        updated_at: '2018-05-12 22:57:50',
    },
    {
        ladder_id: 4,
        ladder_name: 'Thoughtworks',
        invite_token: 'YvfJv4dPZ',
        created_at: '2018-07-13 12:03:47',
        updated_at: '2018-12-13 09:57:15',
    },
    {
        ladder_id: 5,
        ladder_name: 'Yakijo',
        invite_token: 'WvKL1RiHid0',
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
];

const mockMatches = [
    {
        match_id: 1,
        ladder_id: 1,
        user_1_id: '1',
        user_2_id: '2',
        winner_id: '1',
        loser_id: '2',
        tied: false,
        created_at: '2018-12-07 05:46:42',
        updated_at: '2018-05-11 06:33:00',
    },
    {
        match_id: 2,
        ladder_id: 2,
        user_1_id: '2',
        user_2_id: '4',
        winner_id: '2',
        loser_id: '4',
        tied: false,
        created_at: '2018-08-22 00:10:00',
        updated_at: '2019-03-23 04:57:33',
    },
    {
        match_id: 3,
        ladder_id: 3,
        user_1_id: '3',
        user_2_id: '5',
        winner_id: '3',
        loser_id: '5',
        tied: false,
        created_at: '2018-05-01 17:04:52',
        updated_at: '2018-12-16 02:16:10',
    },
    {
        match_id: 4,
        ladder_id: 4,
        user_1_id: '2',
        user_2_id: '5',
        winner_id: '2',
        loser_id: '5',
        tied: false,
        created_at: '2018-09-17 01:38:13',
        updated_at: '2018-05-27 00:41:58',
    },
    {
        match_id: 5,
        ladder_id: 5,
        user_1_id: '1',
        user_2_id: '5',
        winner_id: '1',
        loser_id: '5',
        tied: false,
        created_at: '2019-04-06 07:39:01',
        updated_at: '2018-05-12 03:46:10',
    },
    {
        match_id: 6,
        ladder_id: 1,
        user_1_id: '1',
        user_2_id: '3',
        winner_id: '1',
        loser_id: '3',
        tied: false,
        created_at: '2018-12-06 05:46:42',
        updated_at: '2018-05-11 06:33:00',
    },
    {
        match_id: 7,
        ladder_id: 1,
        user_1_id: '2',
        user_2_id: '3',
        winner_id: '3',
        loser_id: '2',
        tied: false,
        created_at: '2018-11-03 05:46:42',
        updated_at: '2018-05-11 06:33:00',
    },
];

/**
 * User 1 and 2 are in all ladders.
 * User 3 is in ladders 1,3,5.
 * User 4 is in ladders 2,4.
 * User 5 is in ladders 1,2,4,5.
 */
const mockLadderUsers = [
    {
        ladder_id: 1,
        user_id: '1',
        rating: 160,
        rating_delta: 30,
        created_at: '2018-12-11 09:39:31',
        updated_at: '2018-10-09 01:00:11',
    },
    {
        ladder_id: 2,
        user_id: '1',
        rating: 100,
        rating_delta: 30,
        created_at: '2018-07-24 06:11:55',
        updated_at: '2018-11-30 11:49:27',
    },
    {
        ladder_id: 3,
        user_id: '1',
        rating: 140,
        rating_delta: 20,
        created_at: '2019-03-09 02:50:35',
        updated_at: '2018-05-12 22:57:50',
    },
    {
        ladder_id: 4,
        user_id: '1',
        rating: 200,
        rating_delta: -5,
        created_at: '2018-07-13 12:03:47',
        updated_at: '2018-12-13 09:57:15',
    },
    {
        ladder_id: 5,
        user_id: '1',
        rating: 100,
        rating_delta: -10,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 1,
        user_id: '2',
        rating: 70,
        rating_delta: 30,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 2,
        user_id: '2',
        rating: 200,
        rating_delta: 20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 3,
        user_id: '2',
        rating: 220,
        rating_delta: 20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 4,
        user_id: '2',
        rating: 260,
        rating_delta: -20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 5,
        user_id: '2',
        rating: 110,
        rating_delta: -20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 1,
        user_id: '3',
        rating: 110,
        rating_delta: -20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 3,
        user_id: '3',
        rating: 90,
        rating_delta: -20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 5,
        user_id: '3',
        rating: 200,
        rating_delta: 20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 2,
        user_id: '4',
        rating: 220,
        rating_delta: 20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 4,
        user_id: '4',
        rating: 100,
        rating_delta: 30,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 1,
        user_id: '5',
        rating: 140,
        rating_delta: 40,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 2,
        user_id: '5',
        rating: 120,
        rating_delta: 20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 4,
        user_id: '5',
        rating: 140,
        rating_delta: -20,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
    {
        ladder_id: 5,
        user_id: '5',
        rating: 160,
        rating_delta: 10,
        created_at: '2018-09-27 20:12:13',
        updated_at: '2018-05-28 10:49:38',
    },
];

module.exports = {
    mockUsers,
    mockLadders,
    mockMatches,
    mockLadderUsers,
};
