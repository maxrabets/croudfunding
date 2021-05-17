export async function getUserBonuses(userId) {
    const response = await fetch(`/api/users/${userId}/bonuses`);
    if(response.ok){
        return await response.json();
    }
    else{
        console.log(response);
        return false
    }
}

export async function getUser(userId) {
    const response = await fetch(`/api/users/${userId}`);
    if(response.ok){
        return await response.json();
    }
    else{
        console.log(response);
        return false
    }
}