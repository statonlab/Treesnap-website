export default class Filters {
  /**
   * Converts collections to array of IDs.
   *
   * @param {Array} collections
   * @private
   */
  _flatten(collections) {
    return collections.map(collection => parseInt(collection.id))
  }

  /**
   * Check if string a contains string b.
   *
   * @param {String} a
   * @param {String} b
   * @returns {boolean}
   * @private
   */
  _contains(a, b) {
    return a.trim().toLowerCase().indexOf(b.trim()) !== -1
  }
}