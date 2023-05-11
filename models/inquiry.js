const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inquiry extends Model {}

Inquiry.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'inquiry',
  }
);

module.exports = Inquiry;