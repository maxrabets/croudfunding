const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Bonus = require("./Bonus");
const Image = require("./Image");
const Tag = require("./Tag");
const News = require("./News");
const Rating = require("./Rating");
const User = require("./User");
const Category = require("./Category");

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
});

// Campaign.belongsTo(User);
// Campaign.belongsTo(Category);
// Campaign.hasMany(Bonus, { onDelete: "cascade" });
// Campaign.hasMany(Rating, { onDelete: "cascade" });
// Campaign.hasMany(Image, { onDelete: "cascade" });
// Campaign.hasOne(Video, { onDelete: "cascade" });
// Campaign.hasMany(News, { onDelete: "cascade" });
// Campaign.belongsToMany(Tag, {
//   through: "campaign_tag",
// });

module.exports = Campaign;