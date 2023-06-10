const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("purchase", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productsId: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },
  });
};
