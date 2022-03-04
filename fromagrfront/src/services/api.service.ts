import ConfigData from "ConfigData";

console.log("ConfigData.API_URL", ConfigData.API_URL);

export async function wakeup() {
    return fetch(`${ConfigData.API_URL}/wakeup`).then(response => response.json())
}

export async function searchFromageByName(fromageName: string) {
    return fetch(`${ConfigData.API_URL}/fromage/search?name=${fromageName}`).then(response => response.json())
}

export async function getVinsForFromage(fromageId: number) {
    return fetch(`${ConfigData.API_URL}/fromage/pairing?id=${fromageId}`).then(response => response.json())
}

export async function getFromageForVin(vinId: number) {
    if (!vinId) {
        return []
    }
    return fetch(`${ConfigData.API_URL}/vin/pairing?id=${vinId}`).then(response => response.json())
}

export async function getRelatedFromage(fromageId: number) {
    if (!fromageId) {
        return []
    }
    return fetch(`${ConfigData.API_URL}/fromage/related?id=${fromageId}`).then(response => response.json())
}

export async function getRelatedVin(vinId: number) {
    if (!vinId) {
        return []
    }
    return fetch(`${ConfigData.API_URL}/vin/related?id=${vinId}`).then(response => response.json())
}

export async function getRandomSuggestion() {
    return fetch(`${ConfigData.API_URL}/randomsuggestion`).then(response => response.json())
}

export async function getSuggestionOfTheDay() {
    return fetch(`${ConfigData.API_URL}/suggestion`).then(response => response.json())
}

export async function getImageUrl(wikidata_id: string) {
    return fetch(`${ConfigData.API_URL}/imageurl?id=${wikidata_id}`).then(response => {
        console.log(response);
        if (!response) {
            return null
        }
        try {
            return response.json()
        } catch {
            return null
        }
    })
}