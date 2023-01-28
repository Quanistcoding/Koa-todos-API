const debug = require("debug")("middleware:checkParamId");
const mongoose = require("mongoose");

// This middleware checks if the thrid parameter of the url is a valid
// Object Id.

module.exports = async (ctx, next) => {
  debug("checking params...");
  const id = ctx.url.split('/')[3];
  if (id) {
    debug("id found...");
    const result = mongoose.Types.ObjectId.isValid(id);
    if (!result) ctx.throw(400, "invalid object id");
    debug("id is valid ObjectId...");
  }
  await next();
}
