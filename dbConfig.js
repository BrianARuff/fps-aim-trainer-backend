const { Pool, Client } = require('pg')
const pool = new Pool(process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PSW,
  database: "fpshighscore"
});

exports.pool = pool;