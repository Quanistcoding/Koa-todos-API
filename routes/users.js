const Router = require("koa-router");
const router = new Router({ prefix: "/api/users" });
const { User, validate } = require("../models/user");
const debug = require("debug")("routes:users");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const auth = require("../middleware/auth");


router.get("/", async ctx => {
  const result = await User.find().select("username email");
  ctx.body = result;
})

router.get("/:id", async ctx => {
  const user = await User.findById(ctx.params.id).select("username email");
  ctx.body = user;
})

router.post("/", async ctx => {
  const { error } = validate.create(ctx.request.body);
  debug(error);
  if (error) {
    ctx.status = 400;
    ctx.body = error.details[0].message;
    return;
  }
  let user = await User.findOne({ email: ctx.request.body.email });

  if (user) {
    return ctx.body = "Email already exits.";
  }

  const hashedPassword = await bcrypt.hash(ctx.request.body.password, 10)

  const data = _.pick(ctx.request.body, ["username", "email"]);
  data.password = hashedPassword;

  user = new User(data);
  
  const result = await user.save();
  ctx.body = result;
})


router.put("/:id", auth, async ctx => {
  console.log(ctx.state.user);

  debug("Updating User...");
  const { error } = validate.update(ctx.request.body);
  if (error) ctx.throw(400, error.details[0].message);

  const data = _.pick(ctx.request.body, ["username", "email"]);
  let user = await User.findByIdAndUpdate(ctx.params.id, data, { new: false })
  ctx.body = "User Updated!";
})

router.delete("/:id", async ctx => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (!user) {
    debug("使用者不存在");
    ctx.throw(400, "使用者不存在");
  }
  ctx.body = user;
})

module.exports = router;