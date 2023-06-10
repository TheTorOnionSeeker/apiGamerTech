const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reviewsScores: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },
    reviewsTexts: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },
  });
};
