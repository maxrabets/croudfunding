const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Campaign = require("./Campaign");

Tag = sequelize.define("tag", {
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

// Tag.belongsToMany(Campaign, {
//   through: "campaign_tag",
//   as: "campaigns",
//   foreignKey: "tagId",
// });

module.exports = Tag;