webpackJsonp([37],{

/***/ "./resources/assets/js/admin/scenes/EventsScene.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("./node_modules/react-router-dom/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Spinner__ = __webpack_require__("./resources/assets/js/components/Spinner.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Path__ = __webpack_require__("./resources/assets/js/helpers/Path.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var EventsScene = function (_Component) {
  _inherits(EventsScene, _Component);

  function EventsScene(props) {
    _classCallCheck(this, EventsScene);

    var _this = _possibleConstructorReturn(this, (EventsScene.__proto__ || Object.getPrototypeOf(EventsScene)).call(this, props));

    _this.state = {
      loading: true,
      events: [],
      page: 1,
      next_page: null,
      prev_page: null,
      per_page: 6,
      has_more_pages: false,
      total: 0
    };
    return _this;
  }

  _createClass(EventsScene, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var state = this.state;
      var params = __WEBPACK_IMPORTED_MODULE_3__helpers_Path__["a" /* default */].parseUrl(this.props.location.search);

      if (params.page) {
        state.page = parseInt(params.page);
        if (isNaN(state.page)) {
          state.page = 1;
        }
      }

      if (params.per_page) {
        state.per_page = parseInt(params.per_page);
        if (isNaN(state.per_page)) {
          state.per_page = 6;
        }
      }

      this.setState(state);

      this.loadEvents(state);
    }
  }, {
    key: 'loadEvents',
    value: function loadEvents(state) {
      var _this2 = this;

      axios.get('/admin/web/events', {
        params: {
          page: state.page,
          per_page: state.per_page
        }
      }).then(function (response) {
        response = response.data.data;
        _this2.setState({
          loading: false,
          events: response.data,
          next_page: response.next_page_url ? response.current_page + 1 : null,
          prev_page: response.prev_page_url ? response.current_page - 1 : null,
          total: response.total,
          page: response.current_page
        });
      }).catch(function (error) {
        if (error.response) {
          alert(error.response);
        }
        console.log(error);
      });
    }
  }, {
    key: 'goTo',
    value: function goTo(page) {
      var state = this.state;
      this.setState({ page: page, loading: true });
      state.page = page;
      this.props.history.push('/events?page=' + page);
      if (typeof window.scrollTo !== 'undefined') {
        window.scrollTo(0, 0);
      }
      this.loadEvents(state);
    }
  }, {
    key: 'renderEvent',
    value: function renderEvent(event, key) {
      var start = event.formatted_start_date;
      var end = event.formatted_end_date;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: key, className: 'column is-4' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card card-equal-height' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'header',
            { className: 'card-header' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h3',
              { className: 'card-header-title' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],
                { to: 'event/' + event.id, title: event.title },
                event.title
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'section',
            { className: 'card-content content mb-none' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Description'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              null,
              event.description
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Location'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'mb-1' },
              event.location.split('\n').map(function (address, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { key: key },
                  address
                );
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Dates'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              null,
              'Starts ',
              start.month,
              ', ',
              start.day,
              ' ',
              start.year,
              ' ',
              start.time,
              end ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null) : null,
              end ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                null,
                'Ends ',
                end.month,
                ', ',
                end.day,
                ' ',
                end.year,
                ' ',
                end.time
              ) : null
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'footer',
            { className: 'card-footer' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '#', className: 'card-footer-item' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-edit mr-0' }),
              'Edit'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '#', className: 'card-footer-item text-danger' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-trash mr-0' }),
              'Delete'
            )
          )
        )
      );
    }
  }, {
    key: 'renderEvents',
    value: function renderEvents() {
      if (this.state.events.length > 0) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'columns is-multiline' },
          this.state.events.map(this.renderEvent.bind(this))
        );
      }

      if (!this.state.loading) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'There are no events added at this time. Please use the button above to create a new event.'
          )
        );
      }

      return null;
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      if (this.state.prev_page === null) {
        return;
      }

      this.goTo(this.state.prev_page);
    }
  }, {
    key: 'goForward',
    value: function goForward() {
      if (this.state.next_page === null) {
        return;
      }

      this.goTo(this.state.next_page);
    }
  }, {
    key: 'getPages',
    value: function getPages() {
      var num = Math.ceil(this.state.total / this.state.per_page);
      var pages = [];
      for (var i = 1; i <= num; ++i) {
        pages.push(i);
      }

      return pages;
    }
  }, {
    key: 'renderPaginator',
    value: function renderPaginator() {
      var _this3 = this;

      if (this.state.per_page > this.state.total) {
        return null;
      }

      var pages = this.getPages();

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'nav',
        { className: 'pagination is-centered', role: 'navigation', 'aria-label': 'pagination' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'button',
            className: 'pagination-previous',
            onClick: function onClick() {
              return _this3.goBack();
            },
            disabled: this.state.prev_page === null },
          'Previous'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'button',
            className: 'pagination-next',
            onClick: function onClick() {
              return _this3.goForward();
            },
            disabled: this.state.next_page === null },
          'Next page'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          { className: 'pagination-list' },
          pages.map(function (page, key) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'li',
              { key: key },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { type: 'button',
                  className: 'pagination-link' + (_this3.state.page === page ? ' is-current' : ''),
                  'aria-label': 'Go to page ' + page,
                  title: 'Go to page ' + page,
                  onClick: function onClick() {
                    _this3.goTo(page);
                  } },
                page
              )
            );
          })
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
          { className: 'is-flex' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            { className: 'title is-3' },
            'Events'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'ml-auto' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { className: 'button is-primary', type: 'button' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: 'icon is-small' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-plus' })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                null,
                'Create Event'
              )
            )
          )
        ),
        this.renderEvents(),
        this.renderPaginator(),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return EventsScene;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (EventsScene);

/***/ }),

/***/ "./resources/assets/js/components/Spinner.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Spinner = function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner(props) {
    _classCallCheck(this, Spinner);

    var _this = _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  /**
   * Set the spinner's initial visibility.
   */


  _createClass(Spinner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ visible: this.props.visible });
    }

    /**
     * Set the spinner's visibility based on properties.
     *
     * @param props
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.visible !== this.state.visible) {
        this.setState({ visible: props.visible });
      }
    }

    /**
     * Render Spinner.
     *
     * @returns {*}
     */

  }, {
    key: 'render',
    value: function render() {
      if (!this.state.visible) {
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

/***/ })

});