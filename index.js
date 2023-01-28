require("./startup/config")();
const debug = require("debug")("index");
require("./startup/db")();
const Koa = require("koa");
const config = require("config");
const { koaBody } = require("koa-body");
const logger = require("./startup/logger");
const morgan = require("koa-morgan");
const errorHandler = require("./middleware/errorHandler");
const pageNotFoundHandler = require("./middleware/pageNotFoundHandler");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const app = new Koa();
const accessControl = require("./middleware/accessControl");
const checkParamId = require("./middleware/checkParamId");


app.use(koaBody());


app.use(errorHandler);
app.use(accessControl);
app.use(pageNotFoundHandler);

if (app.env !== "production") {
  app.use(morgan('tiny'));
};

app.use(checkParamId);
app.use(userRouter.routes());
app.use(authRouter.routes());

const port = config.get("port");
if (!module.parent) {
  app.listen(port, () => {
    debug("Serve listening on port " + port);
    logger.info("Serve listening on port " + port);
  });
} else {
  module.exports = app.listen(config.get("port"));
}

