export async function getComments(campaignId) {
    const response = await fetch(`/api/campaigns/${campaignId}/comments`);
    if(response.ok){
        const comments = await response.json()
        console.log(comments)
        return comments;
    }
    else{
        console.log(response);
        alert("error");
        return false;
    }
}

export async function createComment(campaignId, commentText, token) {
    const response = await fetch(`/api/campaigns/${campaignId}/comments`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({commentText})
    })
    console.log(response);
    if(response.ok) 
        return response.json();
    else
        alert("error");
}