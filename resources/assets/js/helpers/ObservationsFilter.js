export default class ObservationsFilter {
    constructor(observations) {
        this._observations = observations
        this._sortable     = []
        this._categoryName = ''
        this._searchTerm   = ''
        this._collectionID = -1
    }

    search(term) {
        this._searchTerm = term
        return this._filter()
    }

    collection(collection_id) {
        this._collectionID = collection_id
        return this._filter()
    }

    category(category) {
        this._categoryName = category
        return this._filter()
    }

    sort(column, observations) {

    }

    _search(term, observation) {
        if (term.trim() === '') {
            return true
        }

        term = term.trim().toLowerCase()

        if (observation.observation_category.toLowerCase().indexOf(term) > -1) {
            return true
        }

        if (observation.user.name.toLowerCase().indexOf(term) > -1) {
            return true
        }

        if (observation.location.address !== null) {
            if (observation.location.address.formatted.toLowerCase().indexOf(term) > -1) {
                return true
            }
        }

        return false
    }

    _flatten(collections) {
        return collections.map(collection => parseInt(collection.id))
    }

    _collection(id, observation) {
        id = parseInt(id)
        if (id === -1) {
            return true
        }

        let collections = this._flatten(observation.collections)
        return collections.indexOf(id) > -1
    }

    _category(category, observation) {
        if (category.trim() === '') {
            return true
        }

        return category === observation.observation_category
    }

    _filter() {
        return this._observations.filter(observation => {
            return this._collection(this._collectionID, observation)
                && this._search(this._searchTerm, observation)
                && this._category(this._categoryName, observation)
        })
    }
}