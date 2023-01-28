const debug = require("debug")("middleware:auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");


module.exports = async (ctx, next) => {
  const authToken = ctx.request.header["x-auth-token"];
  if (!authToken) ctx.throw(401, "Not Authorized!");
  const decoded = jwt.verify(authToken, config.get("jwtPrivateKey"));
  debug(decoded);
  ctx.state.user = _.pick(decoded,["username", "email", "isAdmin"]);
  await next();
}