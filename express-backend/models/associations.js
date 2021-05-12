const Campaign = require("./Campaign");
const Reaction = require("./Reaction");
const Comment = require("./Comment");
const Bonus = require("./Bonus");
const Achievment = require("./Achievment");
const Rating = require("./Rating");
const User = require("./User");
const Category = require("./Category");
const Image = require("./Image");
const News = require("./News");
const ReactionType = require("./ReactionType");
const Tag = require("./Tag");
const Video = require("./Video");
const Payment = require("./Payment");

Achievment.belongsToMany(User, {
    through: "user_achievment",
    as: "achievment",
    foreignKey: "achievment_id",
});
Bonus.belongsTo(Campaign, { onDelete: "cascade" });
Bonus.belongsToMany(User, {
  through: "user_bonus",
});
Campaign.belongsTo(User);//cascade
Campaign.belongsTo(Category);//cascade
Campaign.hasMany(Bonus, { onDelete: "cascade" });
Campaign.hasMany(Rating, { onDelete: "cascade" });
Campaign.hasMany(Image, { onDelete: "cascade" });
Campaign.hasOne(Video, { onDelete: "cascade" });
Campaign.hasMany(News, { onDelete: "cascade" });
Campaign.hasMany(Comment, { onDelete: "cascade" });
Campaign.hasMany(Payment, { onDelete: "cascade" });
Campaign.belongsToMany(Tag, {
  through: "campaign_tag",
});
Category.hasMany(Campaign);//cascade
Comment.belongsTo(User);//cascade
Comment.belongsTo(Campaign);
Comment.hasMany(Reaction, {onDelete: "cascade"});
Image.belongsTo(Campaign, { onDelete: "cascade" });
News.belongsTo(Campaign, { onDelete: "cascade" });
Payment.belongsTo(User);//cascade
Payment.belongsTo(Campaign);
Rating.belongsTo(User, { onDelete: "cascade" });
Rating.belongsTo(Campaign, { onDelete: "cascade" });
Reaction.belongsTo(User, { onDelete: "cascade" });
Reaction.belongsTo(Comment, { onDelete: "cascade" });
ReactionType.hasMany(Reaction, {onDelete: "cascade"});
Tag.belongsToMany(Campaign, {
    through: "campaign_tag",
    as: "campaigns",
    foreignKey: "tagId",
  });
User.hasMany(Campaign, {onDelete: "cascade"});
User.hasMany(Reaction, {onDelete: "cascade"});
User.hasMany(Comment, {onDelete: "cascade"});
User.hasMany(Rating, {onDelete: "cascade"});
User.hasMany(Payment, {onDelete: "cascade"});
User.belongsToMany(Bonus, {
  through: "user_bonus",
});
User.belongsToMany(Achievment, {
  through: "user_achievment",
});
Video.belongsTo(Campaign, { onDelete: "cascade" });