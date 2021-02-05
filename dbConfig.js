const env = require("dotenv");
env.config();
const {Pool} = require("pg");
const pool = new Pool({connectionString: process.env.DATABASE_URL, ssl: true});
pool.connect();
exports.pool = pool;