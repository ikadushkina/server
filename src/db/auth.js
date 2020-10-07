const bcrypt = require("bcryptjs");
const models = require("../../models");
const tokenjs = require("../utils/token");

async function findUser(login) {
  return await models.User.findOne({
    where: {
      login,
    },
  });
}
async function isValidPassword(user, password) {
  if (!user) {
    throw new Error("User undefined");
  }
  const pass = user.getDataValue("password");
  const valid = bcrypt.compareSync(password, pass);
  if (!valid) {
    throw new Error("Wrong login or password");
  }
  return valid;
}

const log = (...args) => {
  if (isDebug) {
    console.log(...args);
  }
};

async function createSession(id, session, token) {
  const ttl = tokenjs.decode(token).exp;
  await models.Session.create({
    user_id: id,
    session_id: session,
    ttl,
  });
}

async function loginUser(login, password, session) {
  const user = await findUser(login);
  const isValid = await isValidPassword(user, password);
  const id = await user.getDataValue("id");
  if (isValid) {
    const token = await tokenjs.createToken(login, session, id);
    await createSession(id, session, token);
    return token;
  }
  throw new Error("Credentials is invalid");
}

async function logoutUser(userId, sessionId) {
  await models.Session.destroy({
    where: {
      user_id: userId,
      session_id: sessionId,
    },
  });
}

async function registerUser(name, login, email, password) {
  const oldUser = await findUser(login);
  if (oldUser) {
    throw new Error("User exists");
  }
  const pass = bcrypt.hashSync(password, 10);
  await models.User.create({
    name,
    login,
    email,
    password: pass,
  });
}

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
};
