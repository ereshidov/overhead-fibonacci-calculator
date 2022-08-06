const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Pool } = require("pg");

const redis = require("redis");

const config = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");

  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hGetAll("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.hSet("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);

  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening on port 5000...");
});

const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});

pgClient.on("error", () => console.log("Lost PG connection"));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch((err) => {
    console.log(err);
  });

const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();
