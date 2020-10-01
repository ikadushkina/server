const jwt = require("jsonwebtoken")
const jwtKey = require('./env')

const jwtExpirySeconds = 30;

function createToken(login, session){
    return jwt.sign({login, session}, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
}

module.exports = {
    createToken
}