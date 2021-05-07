const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
const Bonus = require("./Bonus");

Campaign = sequelize.define("campaign", {
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
  currentMoney: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0,
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

Campaign.hasMany(Bonus, { onDelete: "cascade" });

module.exports = Campaign;