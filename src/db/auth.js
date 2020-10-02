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
  console.log({ login, password, session, isValid });

  if (isValid) {
    const email = await user.getDataValue("email");
    const token = await tokenjs.createToken(login, email, session, id);
    await createSession(id, session, token);
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
  const oldUser = await findUser(login);
  if (oldUser) {
    console.log("User exists");
    return;
  }
  const pass = bcrypt.hashSync(password, 10);
  const user = await models.User.create({
    name,
    login,
    email,
    password: pass,
  });
  const id = await user.getDataValue("id");
  const token = await tokenjs.createToken(login, email, session, id);
  await createSession(id, session, token);
  return token;
}

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
};
