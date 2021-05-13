const paymentsService = require("../services/paymentsService")

exports.createPayment = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const money= request.body.money;
    const result = await paymentsService.createPayment(campaignId, userId, money);
    if(result)
        response.sendStatus(200);
    else
        response.sendStatus(400);
};