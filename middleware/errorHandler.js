const debug = require("debug")("middleware:errorHandler");
const logger = require("../startup/logger")

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    debug(error);
    const errorMessage = error.message || error || "something went wrong";
    logger.error(errorMessage);
    debug(ctx.status);
    ctx.status = error.status || ctx.status || 500;
    ctx.body = errorMessage;
  }
}