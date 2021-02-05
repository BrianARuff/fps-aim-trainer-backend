const express = require("express");
const app = express();

// params and body content coming in
app.use(express.json());
express.urlencoded({
  extended: true
});

// cross origin
const cors = require("cors");
app.use(cors());

const db = require("./dbConfig").pool;

app.post("/", (req, res) => {
  const username = req.body.username;
  const score = req.body.score;
  db.query(`insert into score(username, score) values($1, $2) returning *`, [username, score], (err, response) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(response.rows[0])
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
  db.query("select * from score", (err, response) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      console.log(response.rows)
      return res.json(response.rows);
    }
  })
});



app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
})