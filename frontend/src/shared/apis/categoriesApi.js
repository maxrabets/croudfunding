export async function getCategories() {
    const response = await fetch(`/api/campaigns/categories`);
    if(response.ok){
        return await response.json();
    }
    else{
        console.log(response);
        return false
    }
}