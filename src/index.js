const express = require("express");
const process = require("process");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const { checkTokenMiddleware } = require("./utils/middlewares/checkToken");

console.log(process.env.JWT_SECRET);
console.log(process.env.TTL_TOKEN);

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(checkTokenMiddleware);
app.use(routes);

app.listen(3000);
