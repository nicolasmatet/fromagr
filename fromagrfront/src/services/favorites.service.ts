import { Subject } from "rxjs";
import { VinOuFromage } from "../interfaces/Fromage";
import { debounceTime } from 'rxjs/operators';
const FAVORITES = 'favorites'
export const favoriteSubject = new Subject<VinOuFromage[]>();
const _favoriteSaver = new Subject<VinOuFromage[]>()
_favoriteSaver.pipe(debounceTime(2000)).subscribe(value => {
    localStorage.setItem(FAVORITES, JSON.stringify(value))
})

const _favorites = getFavorites();
const _favoritesIds = new Set(_favorites.map((f: VinOuFromage) => f.identity.low))

function getFavorites(): VinOuFromage[] {
    let favorites = localStorage.getItem(FAVORITES);
    if (favorites) {
        return JSON.parse(favorites)
    }
    return []
}

export function refreshFavorites() {
    favoriteSubject.next(_favorites)
}

export function isFavorite(node: VinOuFromage): boolean {
    return _favoritesIds.has(node.identity.low)
}

export function toogleFavorite(node: VinOuFromage) {
    if (isFavorite(node)) {
        removeFavorite(node)
    }
    else {
        addFavorite(node)
    }
}

export function removeFavorite(node: VinOuFromage) {
    const id = node.identity.low
    const idx = _favorites.findIndex((f: VinOuFromage) => f.identity.low == id)
    if (idx >= 0) {
        _favorites.splice(idx, 1)
    }
    if (_favoritesIds.has(id)) {
        _favoritesIds.delete(id)
    }
    _favoriteSaver.next(_favorites)
    refreshFavorites()
}

export function addFavorite(node: VinOuFromage) {
    if (isFavorite(node)) {
        return
    }
    _favorites.push(node)
    _favoritesIds.add(node.identity.low)
    _favoriteSaver.next(_favorites)
    refreshFavorites()
}
