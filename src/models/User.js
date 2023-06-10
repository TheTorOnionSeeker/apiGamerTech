const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    uId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://i.imgur.com/2WZtVXx.png", 
    }
  });
};
