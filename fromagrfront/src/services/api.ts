import { config } from '../../config'

export async function searchCheeseByName(fromageName: string) {
    return fetch(`${config.API_URL}/fromage/search?name=${fromageName}`).then(response => response.json())
}

export async function getWinesForCheese(fromageId: number) {
    return fetch(`${config.API_URL}/fromage/pairing?id=${fromageId}`).then(response => response.json())
}

export async function getCheeseFromWine(vinId: number) {
    if (!vinId) {
        return []
    }
    return fetch(`${config.API_URL}/vin/pairing?id=${vinId}`).then(response => response.json())
}