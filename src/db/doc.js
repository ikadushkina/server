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

async function assTagToDoc(doc_id, tag_id) {
  const old = await models.DocTag.findOne({
    where: {
      doc_id,
      tag_id,
    },
  });
  if (old) {
    console.log("this doc/tag exists");
    return old;
  } else {
    return await models.DocTag.create({
      doc_id,
      tag_id,
    });
  }
}

module.exports = {
  addDoc,
  assTagToDoc,
};
