const bcrypt = require("bcryptjs");
const models = require("../../models");
const tokenjs = require("../utils/token");
const { decode } = require("jsonwebtoken");

async function checkExists(login) {
  return await models.User.findOne({
    where: {
      login,
    },
  });
}
async function verification(user, password) {
  if (!user) {
    console.log("User undefined");
    return null;
  } else {
    const pass = user.getDataValue("password");
    const valid = bcrypt.compareSync(password, pass);
    if (!valid) console.log("Wrong login or password");
    else console.log(valid);
    return valid;
  }
}

async function loginUser(login, password, session) {
  const user = await checkExists(login);
  const isValid = await verification(user, password);
  const id = await user.getDataValue("id");
  console.log({ login, password, session, isValid });

  if (isValid) {
    const token = await tokenjs.createToken(login, session, id);
    const ttl = decode(token).exp;
    await models.Session.create({
      user_id: id,
      session_id: session,
      ttl,
    });

    return token;
  }
  throw new Error("credentials is invalid");
}

async function logoutUser(userId, sessionId) {
  await models.Session.destroy({
    where: {
      user_id: userId,
      session_id: sessionId,
    },
  });
}

async function registerUser(name, login, email, password, session) {
  const oldUser = await checkExists(login);
  if (oldUser) {
    console.log("User exists");
    return null;
  } else {
    const pass = bcrypt.hashSync(password, 10);
    const user = await models.User.create({
      name,
      login,
      email,
      password: pass,
    });
    const id = await user.getDataValue("id");
    const token = await tokenjs.createToken(login, email, session, id);
    const ttl = decode(token).exp;
    await models.Session.create({
      user_id: id,
      session_id: session,
      ttl,
    });
    return token;
  }
}

module.exports = {
  checkExists,
  verification,
  loginUser,
  logoutUser,
  registerUser,
};
