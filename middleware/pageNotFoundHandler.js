const debug = require("debug")("middleware:pageNotFoundHandler");

module.exports = async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    debug(ctx.status);
    ctx.body = "This page is not found.";
  }
}