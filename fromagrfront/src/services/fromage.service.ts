import { Fromage, VinOuFromage } from "../interfaces/Fromage";
import { Subject } from 'rxjs';
import { searchFromageByName, getVinsForFromage, getFromageForVin, getRelatedFromage } from "./api.service";
import { debounceTime } from 'rxjs/operators';

export class FromageService {

    private searchResults: Subject<Fromage[]> = new Subject<Fromage[]>();
    private searchStrings: Subject<string> = new Subject<string>();

    constructor() {
        this.searchStrings.pipe(debounceTime(500)).subscribe(async (fromageName) => {
            const results = await searchFromageByName(fromageName);
            this.searchResults.next(results);
        })
    }
    subscribeToSearchResults(callback: any) {
        return this.searchResults.subscribe((fromages) => {
            callback(fromages)
        })
    }

    searchByName(fromageName: string) {
        this.searchStrings.next(fromageName)
    }

    async awaitRelatedFromage(fromageId: number, callback: any) {
        const related = (await getRelatedFromage(fromageId)).map((p: [Fromage]) => p[0])
        callback(related)
    }
    static async awaitPairings(sourceLabel: string | null, sourceId: string | null, callback: any) {
        const pairings = await FromageService.getPairings(sourceLabel, sourceId)
        callback(pairings)
    }

    private static async getPairings(sourceLabel: string | null, sourceId: string | null) {
        if (!sourceId || !sourceLabel) {
            return []
        }
        try {
            let sourceIdInt = parseInt(sourceId);
            const nodeLabel = sourceLabel.toLowerCase();
            if (nodeLabel === "fromage") {
                return (await getVinsForFromage(sourceIdInt)).map((v: [VinOuFromage]) => v[0]);
            } else if (nodeLabel === "vin") {
                return (await getFromageForVin(sourceIdInt)).map((v: [VinOuFromage]) => v[0]);
            }
        } catch {
            return []
        }
    }

}