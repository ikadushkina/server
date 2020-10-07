const express = require("express");
const routes = require("./routes");
const app = express();
const { checkTokenMiddleware } = require("./utils/middlewares/checkToken");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(checkTokenMiddleware(["/auth/login", "/auth/register"]));
app.use(routes);

module.exports = { app };
