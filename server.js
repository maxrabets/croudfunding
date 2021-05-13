const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const camapignsRouter = require("./routes/campaignsRouter");
const usersRouter = require("./routes/usersRouter");
const cors = require('cors');
const sequelize = require("./config/sequelize");
const Category = require("./models/Category");
const ReactionType = require("./models/ReactionType");
require("./models/associations");
require('dotenv').config();


var port = process.env.PORT || 8080;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if(process.env.NODE_ENV === "production") {  
  app.use(express.static(`${__dirname}/frontend/build`));
}

app.use("/campaigns", camapignsRouter);
app.use("/users", usersRouter); 

sequelize.sync({force: false}).then(async (result)=>{
/////////////////
if(process.env.NODE_ENV === "production") {  
  await Category.create({name: "IT"});
  await Category.create({name: "Education"});
  await Category.create({name: "Fashion"});
  await Category.create({name: "Medicine"});

  await ReactionType.create({name: "like"});
  await ReactionType.create({name: "dislike"});
}
////////////////////////

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch(err=> console.log(err));