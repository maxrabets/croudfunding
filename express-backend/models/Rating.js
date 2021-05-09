const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Campaign = require("./Campaign");
const User = require("./User");

Rating = sequelize.define("rating", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

// Rating.belongsTo(User);
// Rating.belongsTo(Campaign);

module.exports = Rating;