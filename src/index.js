const express = require("express");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const { checkTokenMiddleware } = require("./utils/middlewares/checkToken");

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(checkTokenMiddleware(["/auth/login", "/auth/register"]));
app.use(routes);

app.listen(3000);
