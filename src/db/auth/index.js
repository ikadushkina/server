const bcrypt = require('bcryptjs');
const models = require('../../../models');
const jwt = require("jsonwebtoken")
const process = require("process");
const {decode} = require("jsonwebtoken");

async function checkExists(login) {
        const user = await models.User.findOne({
            where: {
                login
            }
        });
        return !!user
}
async function verification(login, password){
    const user = await models.User.findOne({
        where: {
            login: login
        }
    })
    if (!user) {
        console.log("User undefined");
        return null;
    }
    else {
        const pass = user.getDataValue('password')
        const valid = bcrypt.compareSync(password, pass)
        if (!valid) console.log("Wrong login or password");
        else console.log(valid);
        return valid;
    }
}

if (!process.env["JWT_SECRET"]) {
    console.error("ENV 'JWT_SECRET' not exists");
    return;
}

const jwtKey = process.env.JWT_SECRET;
const jwtExpirySeconds = 30;

async function loginUser(login, password, session){
    const user = await models.User.findOne({
        where: {
            login
        }
    })
    await verification(login, password).then(res => {
        if (res) {
            const token = jwt.sign({login, session}, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })

            const idUser = user.getDataValue('id');
            const ttl = decode(token).exp
            models.Session.create({
                 user_id: idUser,
                 session_id: session,
                 ttl
            })
        }
    })
}

module.exports = {
    checkExists,
    verification,
    loginUser,
}