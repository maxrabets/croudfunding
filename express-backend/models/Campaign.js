const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

Campaign = sequelize.define("game", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  targetMoney: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  video: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  tags: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  images: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Campaign;