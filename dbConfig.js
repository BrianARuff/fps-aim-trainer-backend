const { Client } = require('pg')
const client = new Client({connectionString: "postgres://npilrnjuhmdmth:3223569ad5677f42568f78ba4566dcaa19c75a6b733ae15b418f8cddb1e20498@ec2-3-214-3-162.compute-1.amazonaws.com:5432/d5pdd1laepqj1f"
});

exports.client = client;