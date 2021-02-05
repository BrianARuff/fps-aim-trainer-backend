const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fpshighscore",
  password: process.env.PSW,
  port: 5432
});


exports.pool = pool;