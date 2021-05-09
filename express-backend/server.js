const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const camapignsRouter = require("./routes/campaignsRouter");
const usersRouter = require("./routes/usersRouter");
const cors = require('cors');
const sequelize = require("./config/sequelize");
const Category = require("./models/Category");
const Campaign = require("./models/Campaign");
const Image = require("./models/Image");
const Bonus = require("./models/Bonus");
const Tag = require("./models/Tag");
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



sequelize.sync({force: true}).then(async (result)=>{
///////////////////
  Category.create({name: "IT"});
  Category.create({name: "Education"});
  Category.create({name: "Fashion"});
  Category.create({name: "Medicine"});
  ////////////////////////

/////////////////////
  const userId = "KSDLKDS";
  const categoryName = "Fashion";
  const tags1 = [
    {name: "foo"},
    {name: "bar"}
  ]
  const [user, created] = await User.findOrCreate({ where: {id: userId}});
  const category = await Category.findOne({where: {name: categoryName}});
  const campaign = await Campaign.create({
    name: "A",
    targetMoney: 10,
    endDate: new Date,
    userId: userId,
    categoryId: category.id,    
    images: [
      {filename: "error.txt"}
    ],
    bonuses: [
      {name: "name", description: "descr", price: 10}
    ],
  }, {
    include: [Image, Bonus, Tag]
  });
  //campaign.addTags(tags1).then().catch(err => console.log(err))
  for(let i = 0; i < tags1.length; i++) {    
    const [tagFromDb, created] = await Tag.findOrCreate({where: {name: tags1[i].name}});
    console.log(tagFromDb);
    await tagFromDb.addCampaign(campaign);
  } 


  const tags2 = [
    {name: "foo"},
    {name: "baz"}
  ]
  const campaign2 = await Campaign.create({
    name: "B",
    targetMoney: 20,
    endDate: new Date,
    userId: userId,
    categoryId: category.id,    
    images: [
      {filename: "error2.txt"}
    ],
    bonuses: [
      {name: "name2", description: "descr", price: 10}
    ],
  }, {
    include: [Image, Bonus, Tag]
  });
  for(let i = 0; i < tags2.length; i++) {    
    const [tagFromDb, created] = await Tag.findOrCreate({where: {name: tags2[i].name}});
    console.log(tagFromDb);
    await tagFromDb.addCampaign(campaign2);
  } 

  const userCampaigns = await user.getCampaigns({include: {all: true}});
  console.log(userCampaigns); 
  console.log(userCampaigns[0].tags); 
  console.log(userCampaigns[1].tags); 
///////////////

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch(err=> console.log(err));