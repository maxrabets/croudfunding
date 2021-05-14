export async function rateCamapaign(campaignId, rating, token) {
    console.log(campaignId);
    const response = await fetch(`/api/campaigns/${campaignId}/ratings`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({rating})
    })
    console.log(response);
    if(response.ok){
        return await response.json(); //avgRating
    }
    else{
        return false;
    }
}