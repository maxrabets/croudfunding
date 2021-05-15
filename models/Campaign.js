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
    get() {
      const stringValue = this.getDataValue("targetMoney");
      return parseInt(stringValue, 10);
    }
  },
  currentMoney: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    get() {
      const stringValue = this.getDataValue("currentMoney");
      return parseInt(stringValue, 10);
    }
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  // status: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   defaultValue: "active"
  // },  
  status: {
      type: Sequelize.VIRTUAL, 
      get() {
        if(Date.now() > this.endDate && this.currentMoney < this.targetMoney)
          return "failed";
        if(Date.now() <= this.endDate && this.currentMoney < this.targetMoney)
          return "active"
        return "succeed";        
      },
    },  
  creationDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  lastModificationDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  averageRating: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0,
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