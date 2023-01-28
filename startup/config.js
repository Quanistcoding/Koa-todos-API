const config = require("config");
const debug = require("debug")("startup:config");

module.exports = (ctx, next) => {
  if (!config.get("jwtPrivateKey")) {
    debug("FATAL ERROR, jwtPrivateKey is not set")
    process.end(1);
  }
  if (!config.get("db")) {
    debug("FATAL ERROR, db is not set")
    process.end(1);
  }
}