const debug = require("debug")("db:connection");
const config = require("config");
const mongoose = require("mongoose");

module.exports = () => {
  debug("connecting to db...");
  mongoose.connect(config.get("db"))
    .then(info => {
        debug("connect to " + config.get("dbName"))
        })
    .catch(error => {
        debug(error)
    });;
}