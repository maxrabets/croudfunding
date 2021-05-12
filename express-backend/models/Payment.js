const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Reaction = require("./Reaction");
const User = require("./User");

Payment = sequelize.define("payment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  sum: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,    
    defaultValue: Date.now(),
  }
});

// Comment.belongsTo(User); //belongs to campaign
// Comment.hasMany(Reaction, {onDelete: "cascade"});

module.exports = Payment;