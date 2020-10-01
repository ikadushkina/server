const process = require("process");

if (!process.env["JWT_SECRET"]) {
    console.error("ENV 'JWT_SECRET' not exists");
}

const jwtKey = process.env.JWT_SECRET;

module.exports = jwtKey