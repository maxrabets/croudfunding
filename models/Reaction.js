const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");
const Comment = require("./Comment");

Reaction = sequelize.define("reaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
});

// Reaction.belongsTo(User);
// Reaction.belongsTo(Comment);

module.exports = Reaction;