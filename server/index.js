const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Pool } = require("pg");

const config = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
