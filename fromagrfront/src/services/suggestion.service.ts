import { Suggestion } from "../interfaces/Fromage";
import { getRandomSuggestion, getSuggestionOfTheDay } from "./api.service";

export class SuggestionService {

    constructor() {
    }

    static async getSuggestion(then: (res: Suggestion) => any, random = false) {
        try {
            const suggestions = await (random ? getRandomSuggestion() : getSuggestionOfTheDay())
            return then(suggestions[0])
        }
        catch {
            return null
        }
    }
}