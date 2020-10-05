const jwt = require("jsonwebtoken");
const { jwtKey, jwtExpirySeconds } = require("./env");

function createToken(login, session, id) {
  return jwt.sign({ login, session, id }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
}

function decode(token) {
  return jwt.decode(token);
}

function isValid(token) {
  return jwt.verify(token, jwtKey);
}

module.exports = {
  createToken,
  isValid,
  decode,
};
