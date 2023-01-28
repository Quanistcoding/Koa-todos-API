const Router = require("koa-router");
const router = new Router({ prefix: "/api/auth" });
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


router.post("/", async ctx => {
  const { email, password } = ctx.request.body;
  if (!email) ctx.throw(400, "email is required");
  if (!password) ctx.throw(400, "password is required");
  const user = await User.findOne({ email });
  if (!user) ctx.throw(400, "username or password is wrong!")
  const authResult = await bcrypt.compare(password, user.password);
  if (authResult) {
    const jwtPrivateKey = config.get("jwtPrivateKey");
    const data = { username: user.username, email: user.email, isAdmin: user.isAdmin };
    const token = jwt.sign(data, jwtPrivateKey);
    ctx.set("x-auth-token", token);
    ctx.body = data;
    return;
  }
  ctx.throw(500, "username or password is wrong!");
})

module.exports = router;