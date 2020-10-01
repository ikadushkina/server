const auth = require("./auth")
const bcrypt = require('bcryptjs');
const models = require('../../models');


async function createUser(name, login, password) {

    if(name && login && password) {
        await auth.checkExists(login).then(res => {
            if (res) console.log('This user already exists');
            else {
                const passwordHash = bcrypt.hashSync(password, 10)
                models.User.create({
                    name,
                    login,
                    password: passwordHash
                });
            }
        })
    }
    else console.log('error')
}

async function deleteUser(login, password){
    await auth.verification(login, password).then(res => {
        if(res){
            models.User.destroy({
                where:{
                    login
                }
            })
        }
    })
}

async function updatePassword(login, password, newPassword){
    await auth.verification(login, password).then(res => {
        if(res){
            models.User.update({password: newPassword}, {
                where:{
                    password
                }
            })
        }
    })
}

module.exports = {
    auth,
    createUser,
    deleteUser,
    updatePassword
}