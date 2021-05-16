const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Campaign = require("./Campaign");

News = sequelize.define("news", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  header: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creationDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: function() {
      return Date.now()
    }
  },
  lastModificationDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: function() {
      return Date.now()
    }
  }
});

// News.belongsTo(Campaign);

module.exports = News;