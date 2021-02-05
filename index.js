const env = require("dotenv");
env.config();
const express = require("express");
const app = express();

app.use(express.json());
express.urlencoded({extended: true});

const db = require("./dbConfig").pool;

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

app.get("/score", (req, res) => {
  db.query('SELECT score FROM score ORDER BY score DESC LIMIT 1', (err, response) => {
    if (err) {
      res.json(err);
    } else {
      res.json(response.rows[0]);
    }
  })
})

app.get("/", (req, res) => {
  db.query("select * from score").then(r => {
    if (r.rows.length === 0) {
      return res.json("No scores added yet.");
    } else {
      return res.json(r.rows)
    }
  });
});



app.listen("3000", () => {
  console.log("Listening on port 3000");
})