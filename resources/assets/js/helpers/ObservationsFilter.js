import Fuse from 'fuse.js'

export default class ObservationsFilter {
    constructor(observations) {
        this._observations = observations
        this._filterable   = []

        this.fuseOptions = {
            shouldSort        : true,
            threshold         : 0.6,
            location          : 0,
            distance          : 100,
            maxPatternLength  : 32,
            minMatchCharLength: 1,
            keys              : [
                'title',
                'author.firstName'
            ]
        }
        this.fuse        = new Fuse(observations, this.fuseOptions)
    }

    search(term) {

    }

    sort(column) {
    }

    filter() {
    }
}