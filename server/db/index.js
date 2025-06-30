const { Pool } = require('pg');

// Create a new connection pool using environment variables for configuration
const pool = new Pool();

// Export a query function that uses the pool to execute SQL queries
// This allows other modules to run queries using: db.query(text, params)
module.exports = {
    query: (text, params) => pool.query(text, params),
};