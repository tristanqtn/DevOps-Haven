var redis = require("redis");
const configure = require("./configure");

const config = configure();

var db = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: process.env.REDIS_PORT || config.redis.port,
});

process.on("SIGINT", function () {
  db.quit();
});

module.exports = db;
