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

app.use("/campaigns", camapignsRouter);
app.use("/users", usersRouter); 

if(process.env.NODE_ENV === "production") {  
  app.use(express.static(`${__dirname}/frontend/build`));
  app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/frontend/build/index.html`);
  });
}

sequelize.sync({force: false}).then(async (result)=>{
  await Category.findOrCreate({where: {name: "IT"}});
  await Category.findOrCreate({where: {name: "Education"}});
  await Category.findOrCreate({where: {name: "Fashion"}});
  await Category.findOrCreate({where: {name: "Medicine"}});

  await ReactionType.findOrCreate({name: "like"});
  await ReactionType.findOrCreate({name: "dislike"});

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch(err => console.log(err));