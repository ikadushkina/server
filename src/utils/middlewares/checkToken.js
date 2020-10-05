const token = require("../token");

const checkTokenMiddleware = (listExcludeNeedExistToken = []) => (
  req,
  res,
  next
) => {
  if (
    Array.isArray(listExcludeNeedExistToken) &&
    listExcludeNeedExistToken.includes(req.path)
  )
    return next();
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
