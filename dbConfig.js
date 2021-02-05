const env = require("dotenv");
env.config();
const { Pool } = require('pg').native;
const pool = new Pool({connectionString: process.env.DATABASE_URL});
exports.pool = pool;