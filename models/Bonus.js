const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");
const Campaign = require("./Campaign");

Bonus = sequelize.define("bonuses", {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

// Bonus.belongsTo(Campaign);
// Bonus.belongsToMany(User, {
//   through: "user_bonus",
// });

module.exports = Bonus;