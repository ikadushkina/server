const express = require("express");
const routes = require("./routes");
const app = express();
const { checkTokenMiddleware } = require("./utils/middlewares/checkToken");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(checkTokenMiddleware(["/auth/login", "/auth/register"]));

app.use(routes);

module.exports = { app };
