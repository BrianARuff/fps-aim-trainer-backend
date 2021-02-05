const env = require("dotenv");
env.config();
const express = require("express");
const app = express();
const db = require("./dbCongig").pool;


// db.query("insert into score(score, username) values(-500, 'brian')").then(r1 =>  console.log(r1));

app.post("/", (req, res) => {
  const username = req.params.score;
  const score = req.params.username;
  db.query(`insert into score(score, username) values ${score}, ${username}`).then(r1 => {
    console.log(r1.rows);
  }).catch(err => {
    res.json(err);
    console.log(err);
    throw new Error(err);
  })
})

app.get("/", (req, res) => {
  db.query("select * from score").then(r => {
    return res.json(r.rows)
  });
});



app.listen("3000", () => {
  console.log("Listening on port 3000");
})