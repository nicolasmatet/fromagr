import { Fromage } from "../interfaces/Fromage";
import { Subject } from 'rxjs';
import { searchCheeseByName } from "./api";
const RxOp = require('rxjs/operators');

export class FromageService {

    private searchResults: Subject<Fromage[]> = new Subject<Fromage[]>();
    private searchStrings: Subject<string> = new Subject<string>();

    constructor() {
        this.searchStrings.pipe(RxOp.debounceTime(500)).subscribe(async (fromageName) => {
            // @ts-ignore
            const results = await searchCheeseByName(fromageName);
            this.searchResults.next(results);
        })
    }
    subscribeTosearchResults(callback: any) {
        return this.searchResults.subscribe((fromages) => {
            callback(fromages)
        })
    }

    searchByName(fromageName: string) {
        this.searchStrings.next(fromageName)
    }
}