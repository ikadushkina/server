const db = require("../db");
const errors = require("../utils/errors");
const { errorMiddlewareAsync } = require("../utils");
const { v4: uuidv4 } = require("uuid");

const login = errorMiddlewareAsync(async (req, res) => {
  const token = await db.auth.loginUser("yasha", "yasha", uuidv4());
  console.log("LOGIN");
  res.json({ data: { token } });
}, errors.failedCheckLoginOrPassword());

const logout = errorMiddlewareAsync(async (req, res) => {
  await db.auth.logoutUser(req.jwtPayload.id, req.jwtPayload.session);
  console.log("LOGOUT");
  res.json({});
}, errors.failedCheckLoginOrPassword());

const register = errorMiddlewareAsync(async (req, res) => {
  await db.auth.registerUser("Darth Vader", "darth", "darth@ya.ru", "vader");
  res.json({});
}, errors.failedCheckLoginOrPassword());

module.exports = {
  login,
  logout,
  register,
};
