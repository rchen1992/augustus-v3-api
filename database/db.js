const pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // max number of clients in the pool
    max: 10,
    // how long a client is allowed to remain idle before being closed
    idleTimeoutMillis: 30000,
};

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

pool.on('error', function(err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack);
});

// export the query method for passing queries to the pool
// callback arg needed for pgSession middleware to work
exports.query = function(text, values, callback) {
    console.log('query', text, values);
    return pool.query(text, values, callback);
};

exports._shutDown = async function() {
    await pool.end();
};
