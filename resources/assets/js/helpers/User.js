import EventEmitter from './EventEmitter'

class User {
  /**
   * Create the user instance.
   *
   * @param {Object} app Normally stored in window.TreeSnap
   */
  constructor(app) {
    if (typeof app === 'undefined') {
      app = JSON.parse(JSON.stringify(window.TreeSnap))
    }

    this._role        = app.role
    this._isLoggedIn  = app.loggedIn
    this._isAdmin     = app.role === 'admin'
    this._isScientist = app.role === 'scientist'
    this._user        = app.user
    this._groups      = []

    this._abilities = {
      member: [],
      owner : [],
      admin : []
    }

    if (this._role) {
      this._role = this._role.toLowerCase()
    }

    this.initAbilities()
    this.loadGroups()

    EventEmitter.listen('user.groups.updated', this.loadGroups.bind(this))
  }

  /**
   * Initialize abilities.
   */
  initAbilities() {
    // Users, Scientists and Admins
    this._abilities.user = [
      'create notes',
      'create collections',
      'flag observations'
    ]

    // Scientists and Admins Only
    this._abilities.scientist = [
      'contact users',
      'confirm species',
      'access admin pages',
      'view accurate location'
    ].concat(this._abilities.user)

    // Admins Only
    this._abilities.admin = [
      'manage users',
      'delete observations'
    ].concat(this._abilities.scientist)
  }

  /**
   * Load current user groups.
   */
  loadGroups() {
    if(!this.authenticated()) {
      return
    }

    axios.get('/web/groups?with_users=1').then(response => {
      this._groups = response.data.data.map(group => {
        return {
          id: group.id,
          users: group.users.map(user => user.id)
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Determine whether the current user can perform a certain ability.
   *
   * @param {String} ability
   * @returns {Boolean}
   */
  can(ability) {
    if (!this.authenticated() || this._role === null) {
      return false
    }

    return this._abilities[this._role].indexOf(ability) > -1
  }

  /**
   * Checks if the authenticated user owns a certain object.
   *
   * @param {Array, Object, Number} object
   *            If an Object, checks whether the foreign key (default user_id) matches
   *                the current user's id
   *            If an Array, recursively iterates through its content to determine
   *                if the user owns all records in the array
   *            If a Number, checks if the number matches the user id.
   * @param {String} foreign_key
   *            The foreign key label on the object to check against (defaults to user_id)
   * @returns {Boolean}
   */
  owns(object, foreign_key) {
    if (typeof foreign_key === 'undefined') {
      foreign_key = 'user_id'
    }

    if (typeof object === 'object') {
      if (Array.isArray(object)) {
        return object.every(this.owns.bind(this))
      }

      if (typeof object[foreign_key] !== 'undefined') {
        return object[foreign_key] === this._user.id
      }

      return false
    }

    if (typeof object === 'number') {
      return this._user.id === object
    }

    return false
  }

  /**
   * Determines whether the current user shares a group with a given user.
   *
   * @param {Number} user_id The other user's id.
   * @return {boolean}
   */
  inGroupWith(user_id) {
    for(let i in this._groups) {
      if(this._groups[i].users.indexOf(user_id) > -1) {
        return true
      }
    }

    return false
  }

  /**
   * Determines whether the user is in a given group.
   *
   * @param group_id
   * @return {Boolean}
   */
  inGroup(group_id) {
    for(let i in this._groups) {
      if(this._groups[i].id === group_id) {
        return true
      }
    }

    return false
  }

  /**
   * Checks if the user is authenticated.
   *
   * @returns {boolean}
   */
  authenticated() {
    return this._isLoggedIn
  }

  /**
   * Checks if the user has admin role.
   *
   * @returns {boolean}
   */
  admin() {
    return this._isAdmin
  }

  /**
   * Checks if user has scientist role.
   *
   * @returns {boolean}
   */
  scientist() {
    return this._isScientist
  }

  /**
   * Gets the role.
   *
   * @returns {String|Null}
   */
  role() {
    return this._role
  }

  /**
   * Get the authenticated user record.
   *
   * @returns {Object|Boolean}
   */
  user() {
    return this._user
  }
}

// Use JSON to deep copy the object without keeping any references
export default new User()
