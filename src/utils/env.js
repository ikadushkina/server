const process = require("process");

if (!process.env["JWT_SECRET"]) {
  console.error("ENV 'JWT_SECRET' not exists");
}

const jwtKey = process.env.JWT_SECRET;
const jwtExpirySeconds = Number(process.env.JWT_TTL) || 600;

module.exports = { jwtKey, jwtExpirySeconds };
