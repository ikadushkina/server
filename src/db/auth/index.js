const bcrypt = require('bcryptjs');
const models = require('../../../models');
const tokenjs = require('./token')
const jwt = require("jsonwebtoken")
const {decode} = require("jsonwebtoken");

async function checkExists(login) {
    return await models.User.findOne({
            where: {
                login
            }
        })
}
async function verification(user, password){
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

async function loginUser(login, password, session){
    const user = await checkExists(login)
    const isValid = await verification(user, password);
    if (isValid) {
        const token = await tokenjs.createToken(login, session)
        const idUser = user.getDataValue('id');
        const ttl = decode(token).exp
        models.Session.create({
            user_id: idUser,
            session_id: session,
            ttl
        })

    }
}


module.exports = {
    checkExists,
    verification,
    loginUser
}