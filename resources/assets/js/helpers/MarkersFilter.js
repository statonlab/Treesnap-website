export default class MarkersFilter {
    constructor(markers, categories) {
        if(typeof categories === 'undefined') {
            categories = []
        }

        this._markers    = markers
        this._searchTerm = ''
        this._categories = categories
        this._mapBounds  = null
    }

    setCategories(categories) {
        this._categories = categories
    }

    search(term) {
        this._searchTerm = term.trim().toLowerCase()
        return this._filter()
    }

    category(categories) {
        this._categories = categories
        return this._filter()
    }

    bounds(newBounds) {
        this._mapBounds = newBounds
        return this._filter()
    }

    _category(marker) {
        if (this._categories.length === 0) {
            return false
        }

        return this._categories.indexOf(marker.category) !== -1
    }

    _search(marker) {
        if (this._searchTerm.length === 0) {
            return true
        }

        if (this._contains(marker.title, this._searchTerm)) {
            return true
        }

        if (this._contains(marker.owner, this._searchTerm)) {
            return true
        }

        return false
    }

    _bounds(marker) {
        if (this._mapBounds === null) {
            return true
        }

        let pos = {
            lat: marker.position.latitude,
            lng: marker.position.longitude
        }

        return this._mapBounds.contains(pos)
    }

    _contains(a, b) {
        return a.trim().toLowerCase().indexOf(b.trim()) !== -1
    }

    _filter() {
        return this._markers.filter(marker => {
            return this._bounds(marker)
                && this._search(marker)
                && this._category(marker)
        })
    }
}