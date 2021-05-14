export async function createPayment(campaignId, money, token) {
    const response = await fetch(`/api/campaigns/${campaignId}/payment`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({money})
    })
    console.log(response);
    return response.ok;
}
