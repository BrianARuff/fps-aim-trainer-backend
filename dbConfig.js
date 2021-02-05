const { Pool, Client } = require('pg')
const pool = new Pool(process.env.DATABASE_URL || "postgres://postgres:1366@localhost:5432/fpshighscore");

exports.pool = pool;