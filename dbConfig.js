const { Client } = require('pg')
const client = new Client({
  host: 'ec2-18-204-101-137.compute-1.amazonaws.com',
  port: 5432,
  user: 'rlcvhlskrpmcfh',
  password: "37feb2728c7b45601edc48344656c2a74c6bbb91572c58a57a8a176ce1a01c0a",
  database: "d2vvjqce23rq7o",
  ssl: true
});

exports.client = client;