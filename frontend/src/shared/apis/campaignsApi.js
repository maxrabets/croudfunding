import {convertImageToFile} from "../converters/ImagesConverter";
import parseISO from "date-fns/parseISO";

export async function getCampaign(campaignId) {
    const response = await fetch(`/api/campaigns/${campaignId}`);
    if(response.ok){
        const campaign = await response.json();
        campaign.endDate = parseISO(campaign.endDate);
        campaign.category = campaign.category.name;
        campaign.images = campaign.images.map(image => convertImageToFile(image));
        campaign.tags = campaign.tags.map(tag => tag.name);
        return campaign;
    }
    else{
        console.log(response);
        alert("error");
        return false;
    }
}

export async function getUserCampaigns(userId) {
    const response = await fetch(`/api/campaigns?userId=${userId}`);
    if(response.ok){
        const campaigns = await response.json()
        return campaigns;
    }
    else{
        console.log(response);
        alert("error");
        return false;
    }
}

export async function createCampaign(formData, token) {
    const response = await fetch(`/api/campaigns`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    console.log(response);
    return response.ok
}

export async function deleteCampaign(campaignId, token) {
    const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response);
    return response.ok
}

export async function changeCampaign(campaignId, formData, token) {
    const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
    console.log(response);
    return response.ok
}