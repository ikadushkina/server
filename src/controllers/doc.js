const db = require("../db");
const errors = require("../utils/errors");
const { errorMiddlewareAsync } = require("../utils");

const addDocument = errorMiddlewareAsync(async (req, res) => {
  const doc = await db.doc.addDoc(
    "test",
    "test",
    req.jwtPayload.id,
    req.session.id
  );
  console.log("ADD");
  res.json({ data: { doc } });
}, errors.failedCheckLoginOrPassword());

module.exports = {
  addDocument,
};
