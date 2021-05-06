const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_URL,
  define: {
    timestamps: false
  }
});

module.exports = sequelize;