const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Campaign = require("./Campaign");
const Reaction = require("./Reaction");
const Comment = require("./Comment");
const Bonus = require("./Bonus");
const Achievment = require("./Achievment");
const Rating = require("./Rating");

User = sequelize.define("user", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  payedTotal: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    get() {
      const stringValue = this.getDataValue("payedTotal");
      return parseInt(stringValue, 10);
    }
  }
});

// User.hasMany(Campaign, {onDelete: "cascade"});
// User.hasMany(Reaction, {onDelete: "cascade"});
// User.hasMany(Comment, {onDelete: "cascade"});
// User.hasMany(Rating, {onDelete: "cascade"});
// User.belongsToMany(Bonus, {
//   through: "user_bonus",
// });
// User.belongsToMany(Achievment, {
//   through: "user_achievment",
// });

module.exports = User;