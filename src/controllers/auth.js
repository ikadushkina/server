const db = require("../db");
const errors = require("../utils/errors");
const token = require("../utils/token");
const { errorMiddlewareAsync } = require("../utils");
const { v4: uuidv4 } = require("uuid");

const login = errorMiddlewareAsync(async (req, res) => {
  const token = await db.auth.loginUser(
    req.body.login,
    req.body.password,
    uuidv4()
  );
  console.log("LOGIN");
  res.json({ data: { token } });
}, errors.failedCheckLoginOrPassword());

const logout = errorMiddlewareAsync(async (req, res) => {
  await db.auth.logoutUser(req.jwtPayload.id, req.jwtPayload.session);
  console.log("LOGOUT");
  res.json({ message: "WOW!!!" });
}, errors.failedCheckLoginOrPassword());

const register = errorMiddlewareAsync(async (req, res) => {
  console.log("req.body", req.body);
  await db.auth.registerUser(
    req.body.name,
    req.body.login,
    req.body.email,
    req.body.password
  );
  res.json({ message: "WOW!!!" });
}, errors.failedCheckLoginOrPassword());

module.exports = {
  login,
  logout,
  register,
};
