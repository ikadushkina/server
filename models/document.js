"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.belongsToMany(models.User, {
        through: "UserDoc",
        as: "user",
        foreignKey: "doc_id",
      });
      Document.belongsToMany(models.Tag, {
        through: "DocTag",
        as: "tag",
        foreignKey: "doc_id",
      });
    }
  }
  Document.init(
    {
      doc_name: DataTypes.STRING,
      doc_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
