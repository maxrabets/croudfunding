const Campaign = require("../models/Campaign");
const User = require("../models/User");
const Payment = require("../models/Payment");
const { Op } = require('sequelize');

async function createPayment(campaignId, userId, money) {
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)
        return false;
    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    const payment = await Payment.create({sum: money, campaignId, userId});
    campaign.currentMoney += payment.sum;
    if(campaign.currentMoney >= campaign.targetMoney) {
        campaign.status = "finished";
    }
    user.payedTotal += payment.sum;
    const bonuses = await campaign.getBonuses({where: {price: {[Op.lte]: payment.sum}}});
    user.addBonuses(bonuses);
    campaign.save();
    user.save();
    return campaign.currentMoney;
}

exports.createPayment = createPayment;