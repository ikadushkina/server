"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Document, {
        through: "DocTag",
        as: "tag",
        foreignKey: "tag_id",
      });
    }
  }
  Tag.init(
    {
      tag_name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
