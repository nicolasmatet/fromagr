import {config} from '../../config'

export async function searchCheeseByName(fromageName:string){
    return fetch(`${config.BASE_URL}/fromage/search?name=${fromageName}`).then(response => response.json())
}