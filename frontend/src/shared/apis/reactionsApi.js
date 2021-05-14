export async function getReactions(campaignId, commentId) {
    const response = await fetch(`/api/campaigns/${campaignId}/comments/${commentId}/reactions`);
    if(response.ok){
        let reactionTypesCount = await response.json();
        console.log(reactionTypesCount)
        reactionTypesCount = new Map(JSON.parse(reactionTypesCount));
        console.log(reactionTypesCount)
        return reactionTypesCount;
    }
    else{
        console.log(response);
        alert("error");
        return false;
    }
}

export async function createRaction(campaignId, commentId, reactionType, token) {
    const response = await fetch(`/api/campaigns/${campaignId}/comments` + 
        `/${commentId}/reactions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({reactionType})
    })
    console.log(response);
    return response.ok
}
