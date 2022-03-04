export function urlSearch() {
    return '/f/search'
}

export function urlPairing(nodeLabel?: string, id?: number) {
    const base = '/f/pairing'
    if (id === null || id === undefined) {
        return base
    }
    return base + `?nodeLabel=${nodeLabel}&id=${id}`
}

export function urlSuggestions(random: boolean = false) {
    return random ? '/f/randomsuggestions' : '/f/suggestion'
}

export function urlAttributions() {
    return '/f/attributions'
}

export function urlFavorites() {
    return '/f/favorites'
}