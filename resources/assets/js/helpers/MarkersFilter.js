import Filters from './Filters'
import User from '../helpers/User'

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
    this._confirmed    = false
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

  confirmed(value) {
    this._confirmed = parseInt(value) === 1
    return this._filter()
  }

  newCollection(marker, collection) {
    if (!User.authenticated()) {
      return
    }

    for (let i = 0; i < this._markers.length; i++) {
      if (marker.id === this._markers[i].id) {
        this._markers[i].collections.push(collection)
        return this._markers[i]
      }
    }
  }

  newFlag(marker, flag) {
    if (!User.authenticated()) {
      return
    }

    for (let i = 0; i < this._markers.length; i++) {
      if (marker.id === this._markers[i].id) {
        this._markers[i].flags.push(flag)
        return this._markers[i]
      }
    }
  }

  removeCollection(marker, collection_id) {
    if (!User.authenticated()) {
      return
    }

    for (let i = 0; i < this._markers.length; i++) {
      if (marker.id === this._markers[i].id) {
        this._markers[i].collections = this._markers[i].collections.filter(c => collection_id !== c.id)
        return this._markers[i]
      }
    }
  }

  removeFlag(marker, flag_id) {
    if (!User.authenticated()) {
      return
    }

    for (let i = 0; i < this._markers.length; i++) {
      if (marker.id === this._markers[i].id) {
        this._markers[i].flags = this._markers[i].flags.filter(f => parseInt(flag_id) !== f.id)
        return this._markers[i]
      }
    }
  }

  /**
   * Reset bounds filter.
   */
  resetBounds() {
    this._mapBounds = null
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

    if (this._contains(marker.custom_id, this._searchTerm)) {
      return true
    }

    if (this._contains(marker.mobile_id, this._searchTerm)) {
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

  _confirmedOnly(marker) {
    if (this._confirmed === false) {
      return true
    }

    return marker.confirmations_count > 0
  }

  _filter() {
    return this._markers.filter(marker => {
      return this._bounds(marker)
        && this._search(marker)
        && this._category(marker)
        && this._collection(marker)
        && this._confirmedOnly(marker)
    })
  }
}
