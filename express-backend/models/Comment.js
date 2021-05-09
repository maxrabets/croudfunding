const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Reaction = require("./Reaction");
const User = require("./User");

Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

// Comment.belongsTo(User);
// Comment.hasMany(Reaction, {onDelete: "cascade"});

module.exports = Comment;