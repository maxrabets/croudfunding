import {convertImageToFile} from "../converters/ImagesConverter"

export async function getNews(campaignId) {
    const response = await fetch(`/api/campaigns/${campaignId}/news`)
    if(response.ok){
        const news = await response.json()
        news.forEach(post => post.image = convertImageToFile(post.image));
        return news;
    }
    else{
        console.log(response);
        return false
    }
}

export async function createPost(campaignId, formData, token) {
    const response = await fetch(`/api/campaigns/${campaignId}/news`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    if(response.ok) {
        const addedPost = await response.json()
        console.log(addedPost)
        if(addedPost.image)
            addedPost.image = convertImageToFile(addedPost.image);                    
        return addedPost;
    }
    else{        
        console.log(response);
        alert("error");
        return false;
    }
}

export async function deletePost(campaignId, postId, token) {
    const response = await fetch(`/api/campaigns/${campaignId}/news/${postId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    console.log(response);
    return response.ok;
}

export async function changePost(campaignId, postId, formData, token) {
    const response = await fetch(`/api/campaigns/${campaignId}/news/${postId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
    console.log(response);
    return response.ok;
}