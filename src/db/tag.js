const models = require("../../models");

async function findTag(tag_name) {
  return await models.Tag.findOne({
    where: {
      tag_name,
    },
  });
}

async function addTag(tag_name) {
  const oldTag = await findTag(tag_name);
  if (oldTag) {
    console.log("Error: tag exists");
    return oldTag;
  } else {
    return await models.Tag.create({
      tag_name,
    });
  }
}

module.exports = {
  addTag,
};
