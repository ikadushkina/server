const db = require("../db");
const errors = require("../utils/errors");
const { errorMiddlewareAsync } = require("../utils");

const login = errorMiddlewareAsync(async (req, res) => {
  const token = await db.auth.loginUser("johnsnow", "star", req.session.id);
  console.log("LOGIN");
  res.json({ data: { token } });
}, errors.failedCheckLoginOrPassword());

const logout = errorMiddlewareAsync(async (req, res) => {
  console.log("LOGOUT");
  await db.auth.logoutUser(req.jwtPayload.id, req.session.id);
  res.json({});
}, errors.failedCheckLoginOrPassword());

const register = errorMiddlewareAsync(async (req, res) => {
  await db.auth.registerUser(
    "Marry Poppins",
    "marry",
    "marry@ya.ru",
    "poppins",
    req.session.id
  );
  res.json({});
}, errors.failedCheckLoginOrPassword());

module.exports = {
  login,
  logout,
  register,
};
