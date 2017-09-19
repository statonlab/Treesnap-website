class Path {
  constructor() {
    this.setPath()
  }

  setPath() {
    this.path = window.location.pathname
    if (this.path !== '/') {
      this.path.replace(/\/$/g, '')
    }
  }

  isActive(url, exact = true, className = 'is-active') {
    this.setPath()
    if (exact && this.path === url) {
      return className
    } else if (!exact && this.path.indexOf(url) >= 0) {
      return className
    } else {
      return null
    }
  }

  /**
   * Parses a url's query paramaters into JSON.
   *
   * @author  Modified version of https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
   * @param   query String window.location.search
   * @returns {*}
   */
  parseUrl(query) {
    query      = query.substr(1)
    let result = {}

    query.split('&').forEach(function (part) {
      if (!part) {
        return
      }

      part = part.split('+').join(' ') // replace every + with space, regexp-free version

      let eq   = part.indexOf('=')
      let key  = eq > -1 ? part.substr(0, eq) : part
      let val  = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : ''
      let from = key.indexOf('[')

      if (from === -1) {
        result[decodeURIComponent(key)] = val
      } else {
        let to    = key.indexOf(']', from)
        let index = decodeURIComponent(key.substring(from + 1, to))
        key       = decodeURIComponent(key.substring(0, from))
        if (!result[key]) {
          result[key] = []
        }
        if (!index) {
          result[key].push(val)
        } else {
          result[key][index] = val
        }
      }
    })

    return result
  }
}

export default new Path()