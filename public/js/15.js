webpackJsonp([15],{

/***/ 356:
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

/***/ 357:
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

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Navbar__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_HomeFooter__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_LinksSidebar__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Spinner__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_KnowledgeSidebarLinks__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_PartnerList__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_AboutUsView__ = __webpack_require__(615);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var KnowledgeViewScene = function (_Component) {
  _inherits(KnowledgeViewScene, _Component);

  function KnowledgeViewScene(props) {
    _classCallCheck(this, KnowledgeViewScene);

    var _this = _possibleConstructorReturn(this, (KnowledgeViewScene.__proto__ || Object.getPrototypeOf(KnowledgeViewScene)).call(this, props));

    _this.state = {
      content: '',
      loading: false
    };
    return _this;
  }

  _createClass(KnowledgeViewScene, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.fixHeight();
      var title = this.props.title;
      document.title = title + ' - TreeSnap';
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'document' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Navbar__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Spinner__["a" /* default */], { visible: this.state.loading }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'home-section short-content' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'container' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'columns' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'column is-3' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_LinksSidebar__["a" /* default */], { links: __WEBPACK_IMPORTED_MODULE_6__helpers_KnowledgeSidebarLinks__["a" /* default */], title: 'Knowledge Base' })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'column' },
                this.props.title == 'Partners' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_PartnerList__["a" /* default */], null) : null,
                this.props.title == 'About Us' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_AboutUsView__["a" /* default */], null) : null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Spinner__["a" /* default */], { visible: this.state.loading, inline: true })
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_HomeFooter__["a" /* default */], null)
      );
    }
  }]);

  return KnowledgeViewScene;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (KnowledgeViewScene);


KnowledgeViewScene.PropTypes = {
  docPath: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string
};

__WEBPACK_IMPORTED_MODULE_6__helpers_KnowledgeSidebarLinks__["a" /* default */].defaultProps = {
  title: false
};

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Spinner = function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner(props) {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call(this, props));
  }

  /**
   * Render Spinner.
   *
   * @returns {*}
   */


  _createClass(Spinner, [{
    key: 'render',
    value: function render() {
      if (!this.props.visible) {
        return null;
      }

      // Render the inline spinner
      if (this.props.inline) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mt-1', style: this.props.containerStyle },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-refresh fa-spin fa-2x' })
        );
      }

      // Render a full page spinner
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'spinner-overlay',
          style: this.props.containerStyle },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'overlay-blur' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'spinner-container' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'is-loading' })
        )
      );
    }
  }]);

  return Spinner;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Spinner);


Spinner.PropTypes = {
  visible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  containerStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  inline: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Spinner.defaultProps = {
  containerStyle: {},
  inline: false
};

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_Path__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_User__ = __webpack_require__(97);
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
                { className: 'navbar-item has-dropdown is-hoverable' },
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


Navbar.PropTypes = {
  container: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  home: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Navbar.defaultProps = {
  container: false,
  home: false
};

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(97);
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

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(95);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LinksSidebar = function (_Component) {
  _inherits(LinksSidebar, _Component);

  function LinksSidebar() {
    _classCallCheck(this, LinksSidebar);

    return _possibleConstructorReturn(this, (LinksSidebar.__proto__ || Object.getPrototypeOf(LinksSidebar)).apply(this, arguments));
  }

  _createClass(LinksSidebar, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'aside',
          { className: 'menu admin-sidebar is-hidden-mobile', role: 'navigation' },
          this.props.title !== '' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: 'menu-heading' },
            this.props.title
          ) : null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'ul',
            { className: 'menu-list' },
            this.props.links.map(function (link, index) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'li',
                { key: 'sidebar_' + index },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* NavLink */],
                  { to: link.to, activeClassName: 'is-active', exact: true },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa ' + link.icon }),
                  ' ',
                  link.label
                )
              );
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'aside',
          { className: 'tabs is-hidden-tablet home-tabs' },
          this.props.links.map(function (link, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'li',
              { key: 'sidebar_tab_' + index },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* NavLink */],
                { to: link.to, activeClassName: 'is-active', exact: true },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'icon is-small' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa ' + link.icon })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  null,
                  link.label
                )
              )
            );
          })
        )
      );
    }
  }]);

  return LinksSidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (LinksSidebar);


LinksSidebar.PropTypes = {
  links: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

LinksSidebar.defaultProps = {
  title: ''
};

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var KnowledgeSidebarLinks = [{
  to: '/about',
  icon: 'fa-address-card-o',
  label: 'About'
}, {
  to: '/trees',
  icon: 'fa-tree',
  label: 'Trees'
}, {
  to: '/partners',
  icon: 'fa-handshake-o',
  label: 'Partners'
}, {
  to: '/faq',
  icon: 'fa-question-circle-o',
  label: 'FAQ'
}, {
  to: '/privacy-policy',
  icon: 'fa-eye-slash',
  label: 'Privacy Policy'
}, {
  to: '/terms-of-use',
  icon: 'fa-file-text-o',
  label: 'Terms of Use'
}, {
  to: '/contact',
  icon: 'fa-envelope-o',
  label: 'Contact Us'
}];

/* harmony default export */ __webpack_exports__["a"] = (KnowledgeSidebarLinks);

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var PartnerList = function (_Component) {
  _inherits(PartnerList, _Component);

  function PartnerList(props) {
    _classCallCheck(this, PartnerList);

    var _this = _possibleConstructorReturn(this, (PartnerList.__proto__ || Object.getPrototypeOf(PartnerList)).call(this, props));

    document.title = 'Our Partners | TreeSnap';
    return _this;
  }

  _createClass(PartnerList, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'home-section' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          { className: 'title is-3' },
          'Our Partners'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://www.nrs.fs.fed.us/units/invasivescontrol/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/FS_green.png', alt: 'US forest service', className: 'feature-icon' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'USDA Forest Service Northern Research Station'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'The USDA Forest Service Northern Research Station\'s mission is to provide basic and applied knowledge about, and develop methods for, protecting and sustaining landscapes disturbed by invasive species and other agents. As a TreeSnap partner, they will use data on ash and elm to find trees that are resistant to the emerald ash borer and Dutch elm disease. They plan to use data from areas where these threats have been established for some time to identify \u201Clingering\u201D trees that survive long past others have died to be used in research and breeding programs.'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://threatenedforests.com/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/fra.png',
                  alt: 'Forest Restoration Alliance logo',
                  className: 'feature-icon' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'Forest Restoration Alliance'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'The Forest Restoration Alliance works to restore healthy forests and landscapes in eastern America by researching and addressing invasive pest threats to hemlock, firs, and other native trees.'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'http://savehemlocksnc.org/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/HRI.png',
                  alt: 'Hemlock restoration initiative logo',
                  className: 'feature-icon' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'Hemlock Restoration Initiative'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'The Hemlock Restoration Initiative aims to restore eastern and Carolina hemlocks to their native habitats throughout North Carolina and to mitigate damage to hemlocks caused by infestation of the hemlock woolly adelgid. They will use data on hemlock to find trees that are resistant to hemlock woolly adelgid.'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://www.acf.org/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/ACF_logo.png', alt: 'American Chestnut Foundation',
                  className: 'feature-icon'
                })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'American Chestnut Foundation'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'The American Chestnut Foundation seeks to return the American chestnut to its native range. The American Chestnut Foundation will use data on chestnuts to find trees that are resistant to chestnut blight to be added to breeding and research programs.'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'http://www.foresthealthcenter.org' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/FHC_small.png',
                  alt: 'Forest Health Center icon',
                  className: 'feature-icon' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'Forest Health Research and Education Center'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'The Forest Health Research and Education Center\'s mission is to advance the conservation of forested ecosystems by integrating genetics-based biological research with social science research and education and outreach on factors affecting tree health and forest restoration. The Forest Health Research and Education Center will use data on white oak to build a breeding program. Their goal is to be better prepared in the event that any invasive pests that target white oak are introduced in the future.'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'http://atlantabg.org/' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/ABG.png',
                  alt: 'Atlanta Botanical Garden icon',
                  className: 'feature-icon' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'Atlanta Botanical Garden'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'The Atlanta Botanical Garden\'s mission is to develop and maintain plant collections for display, education, research, conservation and enjoyment. The Garden has launched the Center for Southeastern Conservation, an expansion of the Garden\u2019s conservation research and education. Through conservation of imperiled species and habitats in the Carolinas, Tennessee, Georgia, Florida, Alabama, Mississippi, and Louisiana, the Center protects the natural heritage of one of North America\u2019s most biodiverse regions.'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'media' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-left' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/images/flat-icons/teamwork-3.png',
                alt: 'Man Icon',
                className: 'feature-icon' })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'media-content' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'title' },
                'Your Organization?'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'feature-text' },
                'Have a project or tree breeding program you want involved? Let us know! You can visit our contact page, or find us on Facebook or Twitter.'
              )
            )
          )
        )
      );
    }
  }]);

  return PartnerList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (PartnerList);

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var AboutUsView = function (_Component) {
  _inherits(AboutUsView, _Component);

  function AboutUsView() {
    _classCallCheck(this, AboutUsView);

    return _possibleConstructorReturn(this, (AboutUsView.__proto__ || Object.getPrototypeOf(AboutUsView)).apply(this, arguments));
  }

  _createClass(AboutUsView, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "box" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "h3",
            { className: "title is-4 mt-none" },
            "The TreeSnap Project"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "p",
            null,
            "Help our nation\u2019s trees! Invasive diseases and pests threaten the health of America\u2019s forests. Scientists are working to understand what allows some individual trees to survive, but they need to find healthy, resilient trees in the forest to study. That\u2019s where concerned foresters, landowners, and citizens (you!) can help. Tag trees you find in your community, on your property, or out in the wild using TreeSnap! Scientists will use the data you collect to locate trees for research projects like studying genetic diversity of tree species and building better tree breeding programs."
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "box" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "h3",
            { className: "title is-4 mt-none" },
            "The TreeSnap Team"
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "p",
            null,
            "TreeSnap was developed as a collaboration between Scientists at the University of Kentucky and the University of Tennessee. The project is funded in part by the ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "a",
              {
                href: "https://nsf.gov/funding/pgm_summ.jsp?pims_id=5338" },
              "NSF Plant Genome Research Program"
            ),
            ". To learn more about the Staton laboratory and the genomic resources we provide, please visit the",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "a",
              { href: "http://www.hardwoodgenomics.org/" },
              " Hardwoods Genomics Database"
            ),
            "."
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "p",
          { className: "title is-4" },
          "Development Team"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "tile is-ancestor" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "tile is-parent" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-child card us-tile" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "figure",
                  { className: "image face" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/mstaton-min.png", alt: "Margaret Staton" })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title is-4" },
                      "Margaret Staton"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "subtitle is-6" },
                      "Principle Investigator"
                    )
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
              { className: "tile is-child card us-tile" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "figure",
                  { className: "image" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/condon-min.jpg", alt: "Bradford Condon" })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title is-4" },
                      "Bradford Condon"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "subtitle is-6" },
                      "Mobile and Web Developer"
                    )
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
              { className: "tile is-child card us-tile" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "figure",
                  { className: "image" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/almsaeed-min.jpg", alt: "Abdullah Almsaeed" })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title is-4" },
                      "Abdullah Almsaeed"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "subtitle is-6" },
                      "Mobile and Web Developer"
                    )
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "p",
          { className: "title is-4" },
          "Extension and Genetics Team"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "tile is-ancestor" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "tile is-parent" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "tile is-child card us-tile" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "figure",
                  { className: "image is-square" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/Nelson-min.jpg", alt: "Dana Nelson" })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title is-4" },
                      "Dana Nelson"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "subtitle is-6" },
                      "Principal Investigator"
                    )
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
              { className: "tile is-child card us-tile" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "figure",
                  { className: "image is-square" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/abbott-min.jpg", alt: "Bert Abbott" })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title is-4" },
                      "Bert Abbott"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "subtitle is-6" },
                      "Principal Investigator"
                    )
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
              { className: "tile is-child card us-tile" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "figure",
                  { className: "image is-square" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/crocker-min.jpg", alt: "Ellen Crocker" })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "card-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "div",
                  { className: "media" },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "media-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "title is-4" },
                      "Ellen Crocker"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      "p",
                      { className: "subtitle is-6" },
                      "Extension and Outreach Specialist"
                    )
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "card" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "card-image" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "figure",
              { className: "image" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "/images/us/FHREC_photo.jpg", alt: "FHERC Photo" })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "card-content" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "media" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "media-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "p",
                  { className: "subtitle is-6" },
                  "The Forest Health Research and Education Center retreat 2017"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AboutUsView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (AboutUsView);

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(356);
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

/***/ })

});