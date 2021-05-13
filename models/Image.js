const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Campaign = require("./Campaign");

Image = sequelize.define("image", {
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

// Image.belongsTo(Campaign);

module.exports = Image;