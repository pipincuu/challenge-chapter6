'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Biodata.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  Biodata.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthOfDate: DataTypes.DATEONLY,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Biodata',
  });
  return Biodata;
};