import Filters from './Filters'

export default class MarkersFilter extends Filters {
    constructor(markers, categories) {
        super()

        if (typeof categories === 'undefined') {
            categories = []
        }

        this._searchTerm   = ''
        this._markers      = markers
        this._categories   = categories
        this._mapBounds    = null
        this._collectionID = 0
    }

    // ==============
    // PUBLIC METHODS
    // ==============

    replace(markers) {
        this._markers = markers
        return this._filter()
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

    collections(id) {
        this._collectionID = parseInt(id)
        return this._filter()
    }

    // ===============
    // PRIVATE METHODS
    // ===============

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

    _category(marker) {
        if (this._categories.length === 0) {
            return false
        }

        return this._categories.indexOf(marker.category) !== -1
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

    _collection(marker) {
        if (this._collectionID <= 0) {
            return true
        }

        let collections = this._flatten(marker.collections)
        return collections.indexOf(this._collectionID) !== -1
    }


    _filter() {
        return this._markers.filter(marker => {
            return this._bounds(marker)
                && this._search(marker)
                && this._category(marker)
                && this._collection(marker)
        })
    }
}