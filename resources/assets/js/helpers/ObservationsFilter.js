export default class ObservationsFilter {
    constructor(observations) {
        this._observations = observations
        this._sortable     = []
        this._categoryName = ''
        this._searchTerm   = ''
        this._collectionID = -1
    }

    /**
     * Set search filter.
     *
     * @param term
     * @returns {*}
     */
    search(term) {
        this._searchTerm = term
        return this._filter()
    }

    /**
     * Set collection filter.
     *
     * @param collection_id
     * @returns {*}
     */
    collection(collection_id) {
        this._collectionID = collection_id
        return this._filter()
    }

    /**
     * Set category filter.
     *
     * @param category
     * @returns {*}
     */
    category(category) {
        this._categoryName = category
        return this._filter()
    }

    /**
     * Sort by column.
     *
     * @param column
     * @param observations
     */
    sort(column, observations) {

    }

    /**
     * Checks if terms exists in observation.
     *
     * @param term
     * @param observation
     * @returns {boolean}
     * @private
     */
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

    /**
     * Converts object to array.
     *
     * @param collections
     * @private
     */
    _flatten(collections) {
        return collections.map(collection => parseInt(collection.id))
    }

    /**
     * Checks if an observation is in a given collection.
     *
     * @param id
     * @param observation
     * @returns {boolean}
     * @private
     */
    _collection(id, observation) {
        id = parseInt(id)
        if (id === -1) {
            return true
        }

        let collections = this._flatten(observation.collections)
        return collections.indexOf(id) > -1
    }

    /**
     * Checks if an observation is a given category.
     *
     * @param category
     * @param observation
     * @returns {boolean}
     * @private
     */
    _category(category, observation) {
        if (category.trim() === '') {
            return true
        }

        return category === observation.observation_category
    }

    /**
     * Applies all filters and returns a filtered observations array
     *
     * @return {Array}
     * @private
     */
    _filter() {
        return this._observations.filter(observation => {
            return this._collection(this._collectionID, observation)
                && this._search(this._searchTerm, observation)
                && this._category(this._categoryName, observation)
        })
    }
}