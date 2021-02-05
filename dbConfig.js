const { Client } = require('pg')
const client = new Client(process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PSW,
  database: "fpshighscore"
});

exports.client = client;