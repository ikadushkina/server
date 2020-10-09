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

    console.log("next");
    next();
  } catch (e) {
    res.status(400).json({ data: { message: "error check token" } });
  }
};

module.exports = {
  checkTokenMiddleware,
};
