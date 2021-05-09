const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

Achievment = sequelize.define("achievment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

// Achievment.belongsToMany(User, {
//     through: "user_achievment",
//     as: "achievment",
//     foreignKey: "achievment_id",
// });

module.exports = Achievment;