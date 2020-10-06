const models = require("../../models");

async function addDoc(doc_name, doc_type, id) {
  const doc = await models.Document.create({
    doc_name,
    doc_type,
  });
  const doc_id = doc.getDataValue("id");
  await models.UserDoc.create({
    user_id: id,
    doc_id,
  });
  return doc;
}

module.exports = {
  addDoc,
};
