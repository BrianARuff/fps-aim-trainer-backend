const env = require("dotenv");
env.config();
const express = require("express");
const app = express();

app.use(express.json());
express.urlencoded({extended: true});

const db = require("./dbCongig").pool;


// db.query("insert into score(score, username) values(-500, 'brian')").then(r1 =>  console.log(r1));

app.post("/", (req, res) => {
  const username = req.body.username;
  const score = req.body.score;
  db.query(`insert into score(username, score) values($1, $2) returning *`, [username, score], (err, response) => {
    if (err) {
      res.json(err);
    } else {
      return res.json(response.rows[0])
    }
  })
});

app.get("/", (req, res) => {
  db.query("select * from score").then(r => {
    return res.json(r.rows)
  });
});



app.listen("3000", () => {
  console.log("Listening on port 3000");
})