const models = require("../../models");

async function addDoc(doc_name, doc_type) {
  const doc = await models.Document.create({
    doc_name,
    doc_type,
  });
  return doc;
}

module.exports = {
  addDoc,
};
