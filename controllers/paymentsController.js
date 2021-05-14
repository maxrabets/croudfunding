const paymentsService = require("../services/paymentsService")

exports.createPayment = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const money= request.body.money;
    const campaignCurrentMoney = await paymentsService.createPayment(campaignId, userId, money);
    if(campaignCurrentMoney)
        response.json(campaignCurrentMoney);
    else
        response.sendStatus(400);
};