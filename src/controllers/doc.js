const db = require("../db");
const errors = require("../utils/errors");
const { errorMiddlewareAsync } = require("../utils");

const addDocument = errorMiddlewareAsync(async (req, res) => {
  const doc = await db.doc.addDoc(
    req.body.docName,
    req.body.docType,
    req.jwtPayload.id
  );
  console.log("ADD DOC");
  res.json({ data: { doc } });
}, errors.failedCheckLoginOrPassword());

const addTagToDoc = errorMiddlewareAsync(async (req, res) => {
  const doc = await db.doc.assTagToDoc(req.body.doc, req.body.tag);
  console.log("ADD DOC/TAG");
  res.json({ data: { doc } });
}, errors.failedCheckLoginOrPassword());

module.exports = {
  addDocument,
  addTagToDoc,
};
