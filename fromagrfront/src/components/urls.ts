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

export function urlSuggestions(id?: number) {
    const base = '/f/suggestions'
    if (id === null || id === undefined) {
        return base
    }
    return base + `?id=${id}`
}

export function urlFavorites() {
    return '/f/favorites'
}