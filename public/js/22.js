webpackJsonp([22],{

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Spinner__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Tooltip__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Dropdown__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Scene__ = __webpack_require__(277);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var UsersScene = function (_Scene) {
  _inherits(UsersScene, _Scene);

  function UsersScene(props) {
    _classCallCheck(this, UsersScene);

    var _this = _possibleConstructorReturn(this, (UsersScene.__proto__ || Object.getPrototypeOf(UsersScene)).call(this, props));

    _this.state = {
      filters: [],
      loading: true
    };

    _this.account = window.location.pathname.toLowerCase().indexOf('account') !== -1;

    document.title = 'Saved Filters - TreeSnap';
    return _this;
  }

  _createClass(UsersScene, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      axios.get('/web/filters').then(function (response) {
        _this2.setState({
          loading: false,
          filters: response.data.data
        });
      }).catch(function (error) {
        _this2.setState({ loading: false });
      });
    }
  }, {
    key: 'deleteFilter',
    value: function deleteFilter(e, filter) {
      var _this3 = this;

      e.preventDefault();

      if (!confirm('Are you sure you want to delete "' + filter.name + '"?')) {
        return;
      }

      axios.delete('/web/filter/' + filter.id).then(function (response) {
        var filters = _this3.state.filters.filter(function (oldFilter) {
          return filter.id !== oldFilter.id;
        });

        _this3.setState({ filters: filters });
      }).catch(function (error) {
        console.log(error.response);
      });
    }
  }, {
    key: '_renderRow',
    value: function _renderRow(filter) {
      var _this4 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tr',
        { key: filter.id },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          filter.name
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          { className: 'has-text-right' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4__components_Dropdown__["a" /* default */],
            { right: true, trigger: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'button is-small', 'aria-haspopup': 'true', 'aria-controls': 'dropdown-menu' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'icon is-small' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-download' })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'icon is-small' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-down', 'aria-hidden': 'true' })
                )
              ) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/services/download/filter/' + filter.id + '/tsv', className: 'dropdown-item' },
              'TSV Format'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/services/download/filter/' + filter.id + '/csv', className: 'dropdown-item' },
              'CSV Format'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { type: 'button',
              className: 'button is-small is-danger ml-1',
              onClick: function onClick(e) {
                return _this4.deleteFilter(e, filter);
              } },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'icon is-small' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__components_Tooltip__["a" /* default */],
                { label: 'Delete' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-times' })
              )
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          { className: 'title is-3' },
          'Manage Advanced Filters'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          this.state.filters.length !== 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'table',
            { className: 'table is-striped mb-none' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'thead',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'tr',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'th',
                  null,
                  'Name'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'th',
                  { className: 'has-text-right' },
                  'Action'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tbody',
              null,
              this.state.filters.map(this._renderRow.bind(this))
            )
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: 'text-muted' },
            'You have not created any filters yet. You can create new filters in the ',
            this.account ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
              { to: '/map' },
              'Map'
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
              { to: '/observations' },
              'Observations'
            ),
            ' or ',
            this.account ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
              { to: '/account/observations' },
              'your observations'
            ) : null,
            ' page.'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return UsersScene;
}(__WEBPACK_IMPORTED_MODULE_5__Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (UsersScene);

/***/ }),

/***/ 273:
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


Spinner.propTypes = {
  visible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  containerStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  inline: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Spinner.defaultProps = {
  containerStyle: {},
  inline: false
};

/***/ }),

/***/ 277:
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

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.state = {
      show: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        _extends({ className: 'tooltip ' + this.props.position,
          onMouseEnter: function onMouseEnter() {
            return _this2.setState({ show: true });
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.setState({ show: false });
          }
        }, _.omit(this.props, Object.keys(Tooltip.propTypes)), {
          onClick: function onClick() {
            if (_this2.props.hideOnClick) {
              _this2.setState({ show: false });
            }
          }
        }),
        this.props.children,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'tooltip-text' + (this.state.show ? ' show' : '') },
          this.props.label
        )
      );
    }
  }]);

  return Tooltip;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Tooltip);


Tooltip.propTypes = {
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  hideOnClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Tooltip.defaultProps = {
  position: 'top',
  hideOnClick: true
};

/***/ }),

/***/ 349:
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




var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      show: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'show',
    value: function show() {
      this.setState({ show: true });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ show: false });
      }, 100);
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.state.show) {
        this.hide();
        return;
      }

      this.show();
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'dropdown' + (this.state.show ? ' is-active' : '') + (this.props.right ? ' is-right' : '') + ' has-text-left',
          style: { width: this.props.isBlock ? '100%' : undefined } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'dropdown-trigger',
            style: { width: this.props.isBlock ? '100%' : undefined },
            onClick: this.toggle.bind(this), onBlur: this.hide.bind(this) },
          this.props.trigger
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'dropdown-menu', id: 'dropdown-menu', role: 'menu' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'dropdown-content' },
            this.props.children
          )
        )
      );
    }
  }]);

  return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Dropdown);


Dropdown.propTypes = {
  trigger: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  right: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isBlock: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Dropdown.defaultProps = {
  right: false,
  isBlock: false
};

/***/ })

});