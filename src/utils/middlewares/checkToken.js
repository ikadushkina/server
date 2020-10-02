const token = require("../token");

const checkTokenMiddleware = (req, res, next) => {
  if (req.path === "/auth/login" || "/auth/register") return next();
  if (!req.headers.authorization) {
    res.status(400).json({});
    return;
  }

  try {
    const jwtToken = req.headers.authorization.replace("Bearer ", "");
    token.isValid(jwtToken);

    req.jwtPayload = token.decode(jwtToken);

    next();
  } catch (e) {
    res.status(400).json({});
  }
};

module.exports = {
  checkTokenMiddleware,
};
