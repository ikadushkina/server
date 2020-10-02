const process = require("process");

if (!process.env["JWT_SECRET"]) {
  console.error("ENV 'JWT_SECRET' not exists");
}

const jwtKey = process.env.JWT_SECRET;
const jwtExpirySeconds = process.env.TTL || 60;

const port = process.env.APP_PORT || 3000;

module.exports = { jwtKey, jwtExpirySeconds };
