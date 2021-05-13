const Bonus = require("../models/Bonus");

async function updateBonuses(campaign, bonuses) {
    const bonusesFromDb = await campaign.getBonuses();
    for(let i = 0; i < bonusesFromDb.length; i++) {    
        const index = bonuses.findIndex(bonus => bonus.id == bonusesFromDb[i].id);
        if(index > -1) {
            const bonus = bonuses[index];
            bonusesFromDb[i].name = bonus.name;
            bonusesFromDb[i].description = bonus.description;
            bonusesFromDb[i].price = bonus.price;
            bonusesFromDb[i].save();
            bonuses.splice(index, 1);
        }
        else{
            await bonusesFromDb[i].destroy();
        }
    }

    for(let i = 0; i < bonuses.length; i++) {
        bonuses[i].campaignId = campaign.id;
        await Bonus.create(bonuses[i]);
    }
}

exports.updateBonuses = updateBonuses;