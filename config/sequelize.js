const Sequelize = require("sequelize");
require("dotenv").config();  

if(process.env.NODE_ENV === "production") {  
  const pg = require('pg');

  pg.defaults.ssl = {
      require: true,
      rejectUnauthorized: false
  }
  const sequelize = new Sequelize(process.env.DATABASE_URL);
}
else{  
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DATABASE_URL_DEVELOPMENT,
    define: {
      timestamps: false
    }
  });
}


module.exports = sequelize;