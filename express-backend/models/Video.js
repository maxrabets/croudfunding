const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Campaign = require("./Campaign");

Video = sequelize.define("video", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false,    
    unique: true
  },
});

// Video.belongsTo(Campaign);

module.exports = Video;