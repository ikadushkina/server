'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserDoc.init({
    user_id: DataTypes.INTEGER,
    doc_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDoc',
  });
  return UserDoc;
};