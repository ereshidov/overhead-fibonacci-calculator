const redis = require("redis");

const config = require("./config");
const { fibonacci } = require("./helpers/fib");

const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

sub.on("message", (_channel, message) => {
  redisClient.hSet("values", message, fibonacci(parseInt(message)));
});

sub.subscribe("insert");
