webpackJsonp([25],{

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Dropdown__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Spinner__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scenes_Scene__ = __webpack_require__(270);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var FlagsScene = function (_Scene) {
  _inherits(FlagsScene, _Scene);

  function FlagsScene(props) {
    _classCallCheck(this, FlagsScene);

    var _this = _possibleConstructorReturn(this, (FlagsScene.__proto__ || Object.getPrototypeOf(FlagsScene)).call(this, props));

    _this.state = {
      flags: [],
      page: 0,
      per_page: 10,
      total: 0,
      has_more_pages: false,
      loading: true
    };
    return _this;
  }

  _createClass(FlagsScene, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadFlags();
    }
  }, {
    key: 'loadFlags',
    value: function loadFlags() {
      var _this2 = this;

      this.setState({ loading: true });
      axios.get('/admin/web/flags', {
        params: {
          page: this.state.page
        }
      }).then(function (response) {
        var data = response.data.data;

        _this2.setState({
          flags: data.data,
          total: data.total,
          page: data.current_page,
          per_page: data.per_page,
          has_more_pages: data.next_page_url !== null,
          loading: false
        });

        window.scrollTo(0, 0);
      }).catch(function (error) {
        _this2.setState({ loading: false });
        console.log(error);
      });
    }
  }, {
    key: 'clearFlag',
    value: function clearFlag(flag) {
      var _this3 = this;

      if (!confirm('Are you sure you want to delete this flag? This action cannot be undone.')) {
        return;
      }

      this.setState({ loading: true });
      axios.delete('/admin/web/flag/' + flag.id).then(function (response) {
        // Reset the page if there are no flags left in this page
        if (_this3.state.flags.length === 1 && _this3.state.page > 1) {
          _this3.setState({ page: _this3.state.page - 1 }, function () {
            _this3.loadFlags();
          });
          return;
        }
        _this3.loadFlags();
      }).catch(function (error) {
        _this3.setState({ loading: false });
        alert('An error occurred while clearing the flag. Please refresh the page and try again.');
        console.error(error);
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var _this4 = this;

      if (!this.state.has_more_pages) {
        return;
      }

      this.setState({
        page: this.state.page + 1
      }, function () {
        _this4.loadFlags();
      });
    }
  }, {
    key: 'back',
    value: function back() {
      var _this5 = this;

      if (this.state.page <= 1) {
        return;
      }

      this.setState({
        page: this.state.page - 1
      }, function () {
        _this5.loadFlags();
      });
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _this6 = this;

      if (this.state.total === 0) {
        return;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'table',
        { className: 'table' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'thead',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tr',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'Thumbnail'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              { style: { width: '300px' } },
              'Observation'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'Reason'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'Date Flagged'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'Actions'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          this.state.flags.map(function (flag) {
            var user = flag.user;
            var observation = flag.observation;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              { key: flag.id },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                { className: 'table-thumbnail-container' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: observation.thumbnail,
                  alt: observation.observation_category,
                  className: 'table-thumbnail is-rounded' })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/observation/' + observation.id },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'strong',
                      null,
                      observation.observation_category
                    )
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'strong',
                    null,
                    'Uploaded by'
                  ),
                  ' ',
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],
                    { to: '/user/' + observation.user.id },
                    observation.user.name
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'strong',
                    null,
                    'Flagged by'
                  ),
                  ' ',
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],
                    { to: '/user/' + user.id },
                    user.name
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  null,
                  flag.reason
                ),
                flag.comments ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'strong',
                      null,
                      'User Comments'
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    flag.comments
                  )
                ) : null
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                flag.created_at
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2__components_Dropdown__["a" /* default */],
                  {
                    right: true,
                    trigger: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'button',
                      { type: 'button',
                        className: 'button' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'Actions'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { className: 'icon is-small' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-caret-down' })
                      )
                    ) },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/observation/' + observation.id, className: 'dropdown-item' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'span',
                      { className: 'icon is-small mr-0 text-info' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-eye' })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'span',
                      null,
                      'Visit Observation'
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: 'javascript:;',
                      onClick: function onClick() {
                        _this6.clearFlag(flag);
                      },
                      className: 'dropdown-item' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'span',
                      { className: 'icon is-small mr-0 text-danger' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-times' })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'span',
                      null,
                      'Clear Flag'
                    )
                  )
                )
              )
            );
          })
        )
      );
    }
  }, {
    key: 'renderPaginator',
    value: function renderPaginator() {
      var _this7 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'nav',
        { className: 'pagination is-centered', role: 'navigation', 'aria-label': 'pagination' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'button',
            className: 'pagination-previous',
            disabled: this.state.page <= 1 || this.state.loading,
            onClick: function onClick() {
              return _this7.back();
            } },
          'Previous'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'button',
            className: 'pagination-next',
            disabled: !this.state.has_more_pages || this.state.loading,
            onClick: function onClick() {
              return _this7.next();
            } },
          'Next'
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
          'div',
          { className: 'columns is-marginless' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'column' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: 'title is-3' },
              'Flagged Observations'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'column has-text-right' },
            this.state.total,
            ' flags found. Page ',
            this.state.page,
            ' of ',
            Math.ceil(this.state.total / this.state.per_page)
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          this.state.total === 0 && !this.state.loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'There are no flagged observations.'
          ) : null,
          this.renderTable(),
          this.renderPaginator()
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return FlagsScene;
}(__WEBPACK_IMPORTED_MODULE_4__scenes_Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (FlagsScene);

/***/ }),

/***/ 269:
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

/***/ 301:
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