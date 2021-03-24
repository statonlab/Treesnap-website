webpackJsonp([14],{

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(202);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var User = function () {
  /**
   * Create the user instance.
   *
   * @param {Object} app Normally stored in window.TreeSnap
   */
  function User(app) {
    _classCallCheck(this, User);

    if (typeof app === 'undefined') {
      app = JSON.parse(JSON.stringify(window.TreeSnap));
    }

    this._role = app.role !== null ? app.role.toLowerCase() : null;
    this._isLoggedIn = app.loggedIn;
    this._isAdmin = this._role === 'admin';
    this._isScientist = this._role === 'scientist';
    this._user = app.user;
    this._groups = [];

    this._abilities = {
      member: [],
      owner: [],
      admin: []
    };

    if (this._role) {
      this._role = this._role.toLowerCase();
    }

    this.initAbilities();
    this.loadGroups();

    __WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* default */].listen('user.groups.updated', this.loadGroups.bind(this));
  }

  /**
   * Initialize abilities.
   */


  _createClass(User, [{
    key: 'initAbilities',
    value: function initAbilities() {
      // Users, Scientists and Admins
      this._abilities.user = ['create notes', 'create collections', 'flag observations'];

      // Scientists and Admins Only
      this._abilities.scientist = ['contact users', 'confirm species', 'access admin pages', 'view accurate location'].concat(this._abilities.user);

      // Admins Only
      this._abilities.admin = ['manage users', 'delete observations', 'manage events'].concat(this._abilities.scientist);
    }

    /**
     * Load current user groups.
     */

  }, {
    key: 'loadGroups',
    value: function loadGroups() {
      var _this = this;

      if (!this.authenticated()) {
        return;
      }

      axios.get('/web/groups?with_users=1').then(function (response) {
        _this._groups = response.data.data.map(function (group) {
          return {
            id: group.id,
            users: group.users.map(function (user) {
              return user.id;
            })
          };
        });
      }).catch(function (error) {
        console.log(error);
      });
    }

    /**
     * Determine whether the current user can perform a certain ability.
     *
     * @param {String} ability
     * @returns {Boolean}
     */

  }, {
    key: 'can',
    value: function can(ability) {
      if (!this.authenticated() || this._role === null) {
        return false;
      }

      return this._abilities[this._role].indexOf(ability) > -1;
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

  }, {
    key: 'owns',
    value: function owns(object, foreign_key) {
      if (typeof foreign_key === 'undefined') {
        foreign_key = 'user_id';
      }

      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
        if (Array.isArray(object)) {
          return object.every(this.owns.bind(this));
        }

        if (typeof object[foreign_key] !== 'undefined') {
          return object[foreign_key] === this._user.id;
        }

        return false;
      }

      if (typeof object === 'number') {
        return this._user.id === object;
      }

      return false;
    }

    /**
     * Determines whether the current user shares a group with a given user.
     *
     * @param {Number} user_id The other user's id.
     * @return {boolean}
     */

  }, {
    key: 'inGroupWith',
    value: function inGroupWith(user_id) {
      for (var i in this._groups) {
        if (this._groups[i].users.indexOf(user_id) > -1) {
          return true;
        }
      }

      return false;
    }

    /**
     * Determines whether the user is in a given group.
     *
     * @param group_id
     * @return {Boolean}
     */

  }, {
    key: 'inGroup',
    value: function inGroup(group_id) {
      for (var i in this._groups) {
        if (this._groups[i].id === group_id) {
          return true;
        }
      }

      return false;
    }

    /**
     * Checks if the user is authenticated.
     *
     * @returns {boolean}
     */

  }, {
    key: 'authenticated',
    value: function authenticated() {
      return this._isLoggedIn;
    }

    /**
     * Checks if the user has admin role.
     *
     * @returns {boolean}
     */

  }, {
    key: 'admin',
    value: function admin() {
      return this._isAdmin;
    }

    /**
     * Checks if user has scientist role.
     *
     * @returns {boolean}
     */

  }, {
    key: 'scientist',
    value: function scientist() {
      return this._isScientist;
    }

    /**
     * Gets the role.
     *
     * @returns {String|Null}
     */

  }, {
    key: 'role',
    value: function role() {
      return this._role;
    }

    /**
     * Get the authenticated user record.
     *
     * @returns {Object|Boolean}
     */

  }, {
    key: 'user',
    value: function user() {
      return this._user;
    }
  }]);

  return User;
}();

// Use JSON to deep copy the object without keeping any references


/* harmony default export */ __webpack_exports__["a"] = (new User());

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
  }

  _createClass(EventEmitter, [{
    key: 'emit',
    value: function emit(type) {
      var event = void 0;
      if (document.createEvent) {
        event = new Event(type);
        document.dispatchEvent(event);
      } else {
        event = document.createEventObject();
        document.fireEvent('on' + type, event);
      }
    }
  }, {
    key: 'listen',
    value: function listen(type, callback) {
      document.addEventListener(type, callback);
    }
  }, {
    key: 'remove',
    value: function remove(type, callback) {
      document.removeEventListener(type, callback);
    }
  }]);

  return EventEmitter;
}();

/* harmony default export */ __webpack_exports__["a"] = (new EventEmitter());

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
  function Path() {
    _classCallCheck(this, Path);

    this.setPath();
  }

  _createClass(Path, [{
    key: 'setPath',
    value: function setPath() {
      this.path = window.location.pathname;
      if (this.path !== '/') {
        this.path.replace(/\/$/g, '');
      }
    }
  }, {
    key: 'isActive',
    value: function isActive(url) {
      var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is-active';

      this.setPath();
      if (exact && this.path === url) {
        return className;
      } else if (!exact && this.path.indexOf(url) >= 0) {
        return className;
      } else {
        return null;
      }
    }

    /**
     * Parses a url's query paramaters into JSON.
     *
     * @author  Modified version of https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
     * @param   query String window.location.search
     * @returns {*}
     */

  }, {
    key: 'parseUrl',
    value: function parseUrl(query) {
      query = query.substr(1);
      var result = {};

      query.split('&').forEach(function (part) {
        if (!part) {
          return;
        }

        part = part.split('+').join(' '); // replace every + with space, regexp-free version

        var eq = part.indexOf('=');
        var key = eq > -1 ? part.substr(0, eq) : part;
        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
        var from = key.indexOf('[');

        if (from === -1) {
          result[decodeURIComponent(key)] = val;
        } else {
          var to = key.indexOf(']', from);
          var index = decodeURIComponent(key.substring(from + 1, to));
          key = decodeURIComponent(key.substring(0, from));
          if (!result[key]) {
            result[key] = [];
          }
          if (!index) {
            result[key].push(val);
          } else {
            result[key][index] = val;
          }
        }
      });

      return result;
    }
  }]);

  return Path;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Path());

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Navbar__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_HomeJumbotron__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FeaturesList__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_HomeFooter__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Leaderboard__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_TwitterFeed__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_ObservationsFeed__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Scene__ = __webpack_require__(270);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var Welcome = function (_Scene) {
  _inherits(Welcome, _Scene);

  function Welcome(props) {
    _classCallCheck(this, Welcome);

    var _this = _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this, props));

    document.title = 'TreeSnap - Help Our Nation\'s Trees!';
    return _this;
  }

  /**
   * Render the scene.
   *
   * @returns {XML}
   */


  _createClass(Welcome, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'home' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Navbar__["a" /* default */], { home: true }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_HomeJumbotron__["a" /* default */], null)
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'home-section bg-dark' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'container' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'columns' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'column' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'h3',
                  { className: 'title is-3 bg-dark has-text-centered mb-none' },
                  'Leaderboard'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  { className: 'has-text-centered text-dark-muted mb-0' },
                  'Top Submitters of All Time'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_Leaderboard__["a" /* default */], { limit: 5 })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'column' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'h3',
                  { className: 'title is-3 bg-dark has-text-centered mb-none' },
                  'Observation Feed'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  { className: 'has-text-centered text-dark-muted mb-0' },
                  'Latest Observations'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_ObservationsFeed__["a" /* default */], null)
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'column' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'h3',
                  { className: 'title is-3 bg-dark has-text-centered mb-none' },
                  'Tweets'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  { className: 'has-text-centered text-dark-muted mb-0' },
                  'Latest Tweets by @treesnapapp'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_TwitterFeed__["a" /* default */], null)
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_FeaturesList__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_HomeFooter__["a" /* default */], null)
      );
    }
  }]);

  return Welcome;
}(__WEBPACK_IMPORTED_MODULE_8__Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Welcome);

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Scene = function (_Component) {
  _inherits(Scene, _Component);

  function Scene(props) {
    _classCallCheck(this, Scene);

    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, props));

    if (window.ga) {
      setTimeout(function () {
        return window.ga('send', 'pageview');
      }, 2500);
    }
    return _this;
  }

  return Scene;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Scene);

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_Path__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_User__ = __webpack_require__(19);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Navbar = function (_Component) {
  _inherits(Navbar, _Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

    _this.state = {
      isActive: false
    };
    return _this;
  }

  _createClass(Navbar, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({ isActive: !this.state.isActive });
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'nav',
        { className: 'navbar' + (this.props.home ? ' home-nav' : '') },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: '' + (!this.props.container ? 'container' : 'container is-fluid') },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'navbar-brand' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
              { to: '/', className: 'navbar-item' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/logo/ts-logo-' + (this.props.home ? '48' : '32') + '.png',
                alt: 'Logo',
                className: 'logo-img' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: 'logo-text' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'b',
                  null,
                  'Tree'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { style: { fontWeight: 300 } },
                  'Snap'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'navbar-burger', onClick: this.toggle.bind(this) },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', null),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', null),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', null)
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'navbar-menu' + (this.state.isActive ? ' is-active' : '') },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'navbar-end' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://www.facebook.com/treesnapapp/', className: 'navbar-item' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'icon' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-facebook' })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://twitter.com/Treesnapapp', className: 'navbar-item' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'icon' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-twitter' })
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'navbar-end' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                { exact: true, to: '/', className: 'navbar-item', activeClassName: 'is-active' },
                'Home'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                { to: '/map', className: 'navbar-item', activeClassName: 'is-active' },
                'Map'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                { to: '/partners', className: 'navbar-item', activeClassName: 'is-active' },
                'Scientific Partners'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                { to: '/about', className: 'navbar-item', activeClassName: 'is-active' },
                'About'
              ),
              __WEBPACK_IMPORTED_MODULE_4__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'navbar-item' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                  { to: '/scientific-sampling', className: 'navbar-item', activeClassName: 'is-active' },
                  'Scientific Sampling'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'has-dropdown is-hoverable' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                    { to: '/account', className: 'navbar-link', activeClassName: 'is-active' },
                    'Account'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'navbar-dropdown' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                      { to: '/account/observations', className: 'navbar-item', activeClassName: 'is-active' },
                      'My Observations'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                      { to: '/account/groups', className: 'navbar-item', activeClassName: 'is-active' },
                      'Groups'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                      { to: '/account/collections', className: 'navbar-item', activeClassName: 'is-active' },
                      'Collections'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                      { to: '/account/filters', className: 'navbar-item', activeClassName: 'is-active' },
                      'Filters'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', { className: 'navbar-divider' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* NavLink */],
                      { to: '/account', className: 'navbar-item', activeClassName: 'is-active' },
                      'Settings'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'a',
                      { href: '/logout', className: 'navbar-item' },
                      'Logout'
                    )
                  )
                )
              ) : null,
              !__WEBPACK_IMPORTED_MODULE_4__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: '/login', className: 'navbar-item ' + __WEBPACK_IMPORTED_MODULE_2__helpers_Path__["a" /* default */].isActive('/login') },
                'Login'
              ) : null,
              !__WEBPACK_IMPORTED_MODULE_4__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: '/register', className: 'navbar-item ' + __WEBPACK_IMPORTED_MODULE_2__helpers_Path__["a" /* default */].isActive('/register') },
                'Register'
              ) : null,
              __WEBPACK_IMPORTED_MODULE_4__helpers_User__["a" /* default */].can('access admin pages') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: '/admin', className: 'navbar-item ' + __WEBPACK_IMPORTED_MODULE_2__helpers_Path__["a" /* default */].isActive('/admin', false) },
                'Admin'
              ) : null
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Navbar);


Navbar.propTypes = {
  container: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  home: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Navbar.defaultProps = {
  container: false,
  home: false
};

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(19);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var HomeFooter = function (_Component) {
  _inherits(HomeFooter, _Component);

  function HomeFooter(props) {
    _classCallCheck(this, HomeFooter);

    return _possibleConstructorReturn(this, (HomeFooter.__proto__ || Object.getPrototypeOf(HomeFooter)).call(this, props));
  }

  _createClass(HomeFooter, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'home-footer' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'container' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'columns has-text-centered' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column is-4' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'b',
                  null,
                  'Site Map'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'ul',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/map' },
                    'Observations Map'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/account' },
                    'Your Account'
                  )
                ) : null,
                !__WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/register' },
                    'Registration'
                  )
                ) : null,
                !__WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/login' },
                    'Login'
                  )
                ) : null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/developer' },
                    'Developer'
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column is-4' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'b',
                  null,
                  'Resources'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'ul',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/partners' },
                    'About Us'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/contact' },
                    'Contact US'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/about' },
                    'Scientific Partners'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/trees' },
                    'The Trees of TreeSnap'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/faq' },
                    'Frequently Asked Questions'
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column is-4' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'mb-1' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'b',
                  null,
                  'Legal'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'ul',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/privacy-policy' },
                    'Privacy Policy'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/terms-of-use' },
                    'Terms of Use'
                  )
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'columns logos' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column has-text-centered' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://www.utk.edu/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/ut3.png', alt: 'University of Tennessee Logo' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column has-text-centered' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://uky.edu' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/uky3.png', alt: 'University of Kentucky Logo' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column has-text-centered' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://www.nsf.gov/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/nsf1.png', alt: 'NSF Logo' })
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: 'has-text-centered' },
            'Copyright \xA9 ',
            new Date().getFullYear(),
            ' University of Tennessee Knoxville and University of Kentucky.'
          )
        )
      );
    }
  }]);

  return HomeFooter;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (HomeFooter);

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GetAppRow__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(18);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var HomeJumbotron = function (_Component) {
  _inherits(HomeJumbotron, _Component);

  function HomeJumbotron() {
    _classCallCheck(this, HomeJumbotron);

    return _possibleConstructorReturn(this, (HomeJumbotron.__proto__ || Object.getPrototypeOf(HomeJumbotron)).apply(this, arguments));
  }

  _createClass(HomeJumbotron, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'home-inner' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'columns' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'home-text' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'h3',
                  { className: 'title is-4 mb-none' },
                  'AVAILABLE NOW'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'h1',
                  { className: 'title is-1' },
                  'Help Our Nation\u2019s Trees!'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  { className: 'mb-1' },
                  'Invasive diseases and pests threaten the health of America\u2019s forests. Scientists are working to understand what allows some individual trees to survive, but they need to find healthy, resilient trees in the forest to study. That\u2019s where concerned foresters, landowners, and citizens (you!) can help. Tag trees you find in your community, on your property, or out in the wild using TreeSnap! Scientists will use the data you collect to locate trees for research projects like studying the genetic diversity of tree species and building better tree breeding programs.'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
                    { to: '/partners', className: 'button is-borderless' },
                    'Meet the scientists that use TreeSnap data'
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__GetAppRow__["a" /* default */], null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column is-3 has-text-right mock-container is-hidden-mobile' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/x-mockup-min.png', alt: 'Mock Device', className: 'mockup-img' })
            )
          )
        )
      );
    }
  }]);

  return HomeJumbotron;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (HomeJumbotron);

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var GetAppRow = function (_Component) {
  _inherits(GetAppRow, _Component);

  function GetAppRow(props) {
    _classCallCheck(this, GetAppRow);

    var _this = _possibleConstructorReturn(this, (GetAppRow.__proto__ || Object.getPrototypeOf(GetAppRow)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(GetAppRow, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "is-small mt-3 has-text-centered-mobile" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          { href: "https://itunes.apple.com/us/app/treesnap/id1226499160?mt=8" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
            src: "/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg",
            alt: "apple",
            className: "apple-badge-img" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          { href: "https://play.google.com/store/apps/details?id=com.treesource" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
            src: "/images/google-play-badge.png",
            alt: "google play badge",
            className: "google-badge-img" })
        )
      );
    }
  }]);

  return GetAppRow;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (GetAppRow);

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var FeaturesList = function (_Component) {
  _inherits(FeaturesList, _Component);

  function FeaturesList() {
    _classCallCheck(this, FeaturesList);

    return _possibleConstructorReturn(this, (FeaturesList.__proto__ || Object.getPrototypeOf(FeaturesList)).apply(this, arguments));
  }

  _createClass(FeaturesList, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "home-section" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "container" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "h2",
            { className: "title is-3 featured-title" },
            "Application Features"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "tile is-ancestor" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-parent" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "tile is-child box feature-tile" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/flat-icons/earth-globe.png",
                      alt: "Man Icon",
                      className: "feature-icon" })
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title" },
                      "Availability"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "feature-text" },
                      "TreeSnap is available for iOS and Android smart phones, and is",
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "b",
                        null,
                        " completely free"
                      ),
                      ". The app will be available on the Apple AppStore and Google Play."
                    )
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-parent" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "tile is-child box feature-tile" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/flat-icons/folder.png",
                      alt: "Man Icon",
                      className: "feature-icon" })
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title" },
                      "It's a Snap"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "feature-text" },
                      "Come across an ash, hemlock, chestnut, or white oak in the woods? Record it with TreeSnap and its geolocation will be shared with scientists to study it."
                    )
                  )
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "tile is-ancestor" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-parent" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "tile is-child box feature-tile" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/flat-icons/archives.png",
                      alt: "Man Icon",
                      className: "feature-icon" })
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title" },
                      "Data Collection"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "feature-text" },
                      "TreeSnap is easy to use. Snap a photo, answer a few questions and be done in a couple of taps."
                    )
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-parent" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "tile is-child box feature-tile" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/flat-icons/transfer.png",
                      alt: "Man Icon",
                      className: "feature-icon" })
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title" },
                      "Sync"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "feature-text" },
                      "Create an account and sync your observations with the TreeSnap server wirelessly."
                    )
                  )
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "tile is-ancestor" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-parent" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "tile is-child box feature-tile" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/flat-icons/padlock.png",
                      alt: "Man Icon",
                      className: "feature-icon" })
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title" },
                      "Privacy"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "feature-text" },
                      "The GPS location of your trees is protected, and not revealed to outside parties. Our map will only display the approximate location of each tree, or you can opt out of adding your data to the map entirely. Only TreeSnap related research programs will have access to this information."
                    )
                  )
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-parent" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "tile is-child box feature-tile" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/flat-icons/teamwork-3.png",
                      alt: "Man Icon",
                      className: "feature-icon" })
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title" },
                      "Contribute"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "feature-text" },
                      "Information reported in TreeSnap is used by real scientists. That ash you've found might be the start of a completely new breeding program."
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FeaturesList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (FeaturesList);

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Leaderboard = function (_React$Component) {
  _inherits(Leaderboard, _React$Component);

  function Leaderboard(props) {
    _classCallCheck(this, Leaderboard);

    var _this = _possibleConstructorReturn(this, (Leaderboard.__proto__ || Object.getPrototypeOf(Leaderboard)).call(this, props));

    _this.state = {
      leaders: [],
      loading: true
    };

    _this.loadLeaders();
    return _this;
  }

  _createClass(Leaderboard, [{
    key: 'loadLeaders',
    value: function loadLeaders() {
      var _this2 = this;

      axios.get('/web/leaderboard/' + this.props.limit).then(function (response) {
        _this2.setState({ leaders: response.data.data, loading: false });
      }).catch(function (error) {
        _this2.setSTate({ loading: false });
        console.log(error);
      });
    }
  }, {
    key: 'getOrdinalUnit',
    value: function getOrdinalUnit(num) {
      if (num === 1) {
        return 'st';
      }

      if (num === 2) {
        return 'nd';
      }

      if (num === 3) {
        return 'rd';
      }

      return 'th';
    }
  }, {
    key: 'getColorClass',
    value: function getColorClass(num) {

      switch (num) {
        case 1:
          return 'is-success';
          break;
        case 2:
          return 'is-warning';
          break;
        case 3:
          return 'is-danger';
          break;
        case 4:
          return 'is-info';
          break;
        default:
          return 'is-dark';
      }
    }
  }, {
    key: 'renderLeader',
    value: function renderLeader(leader, key) {
      var num = key + 1;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: key, className: 'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center flex-wrap' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'is-flex flex-v-center flex-wrap' },
          leader.thumbnail.src.length > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'item mr-1' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: leader.thumbnail.src,
              alt: leader.thumbnail.alt,
              className: 'item-thumbnail img-circle elevation-1',
              style: { marginTop: 8 } })
          ) : null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              leader.name
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'text-dark-muted' },
              'Submitted ',
              leader.observations_count,
              ' observations'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'hexagon ' + this.getColorClass(num) },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'is-block has-text-centered' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'b',
              null,
              num
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'small',
              null,
              this.getOrdinalUnit(num)
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        this.state.loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'has-text-centered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-spinner fa-spin' })
        ) : null,
        this.state.leaders.map(this.renderLeader.bind(this))
      );
    }
  }]);

  return Leaderboard;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Leaderboard);


Leaderboard.propTypes = {
  limit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

Leaderboard.defaultProps = {
  limit: 5
};

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var TwitterFeed = function (_React$Component) {
  _inherits(TwitterFeed, _React$Component);

  function TwitterFeed() {
    _classCallCheck(this, TwitterFeed);

    return _possibleConstructorReturn(this, (TwitterFeed.__proto__ || Object.getPrototypeOf(TwitterFeed)).apply(this, arguments));
  }

  _createClass(TwitterFeed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        if (window.twttr) {
          window.twttr.widgets.load();
          clearInterval(_this2.interval);
        }
      }, 15);
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          { className: "twitter-timeline",
            "data-height": "487",
            "data-width": "432",
            "data-link-color": "#2A9D8F",
            href: "https://twitter.com/Treesnapapp?ref_src=twsrc%5Etfw" },
          "Tweets by Treesnapapp"
        )
      );
    }
  }]);

  return TwitterFeed;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (TwitterFeed);

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(18);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ObservationsFeed = function (_Component) {
  _inherits(ObservationsFeed, _Component);

  function ObservationsFeed(props) {
    _classCallCheck(this, ObservationsFeed);

    var _this = _possibleConstructorReturn(this, (ObservationsFeed.__proto__ || Object.getPrototypeOf(ObservationsFeed)).call(this, props));

    _this.state = {
      observations: [],
      loading: true
    };
    return _this;
  }

  _createClass(ObservationsFeed, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadObservations();

      setInterval(this.loadObservations.bind(this), 120000);
    }
  }, {
    key: 'loadObservations',
    value: function loadObservations() {
      var _this2 = this;

      axios.get('/web/observations/feed').then(function (response) {
        _this2.setState({ observations: response.data.data, loading: false });
      }).catch(function (error) {
        console.log(error);
        _this2.setState({ loading: false });
      });
    }
  }, {
    key: 'renderObservation',
    value: function renderObservation(observation) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: observation.id,
          className: 'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'is-flex flex-v-center flex-wrap' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'item mr-1' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],
              { to: 'observation/' + observation.id },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: observation.thumbnail,
                alt: observation.observation_category + ' by ' + observation.user.name,
                className: 'item-thumbnail img-circle elevation-1',
                style: { marginTop: 8 } })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],
              { to: 'observation/' + observation.id },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                null,
                observation.observation_category
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'text-dark-muted' },
              'Submitted by ',
              observation.user.name
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'text-dark-muted' },
              observation.date
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: { maxHeight: 487, overflowY: 'auto' }, className: 'invisible-scrollbar' },
        this.state.loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'has-text-centered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-spinner fa-spin' })
        ) : null,
        this.state.observations.map(this.renderObservation.bind(this)),
        this.state.observations.length === 0 && !this.state.loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-dark-muted has-text-centered' },
          'There are no observations at this time'
        ) : null
      );
    }
  }]);

  return ObservationsFeed;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (ObservationsFeed);

/***/ })

});