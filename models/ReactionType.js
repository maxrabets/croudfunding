const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Reaction = require("./Reaction");

ReactionType = sequelize.define("reaction_type", {
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
});

// ReactionType.hasMany(Reaction, {onDelete: "cascade"});

module.exports = ReactionType;