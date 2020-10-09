const db = require("../db");
const errors = require("../utils/errors");
const { errorMiddlewareAsync } = require("../utils");

const addDocument = errorMiddlewareAsync(async (req, res) => {
  const tag = await db.tag.addTag(req.body.tag);
  console.log("ADD TAG");
  res.json({ data: { tag } });
}, errors.failedCheckLoginOrPassword());

module.exports = {
  addDocument,
};
