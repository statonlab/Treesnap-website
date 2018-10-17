webpackJsonp([20],{

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Spinner__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Path__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_EventForm__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_Errors__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Notify__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scenes_Scene__ = __webpack_require__(277);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var EventsScene = function (_Scene) {
  _inherits(EventsScene, _Scene);

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
      total: 0,
      showEventFrom: false,
      selectedEvent: null
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
    key: 'delete',
    value: function _delete(event) {
      var _this3 = this;

      if (!confirm('Are you sure you want to delete ' + event.title + '?')) {
        return;
      }

      axios.delete('/admin/web/event/' + event.id).then(function (response) {
        if (_this3.state.events.length === 1 && _this3.state.page > 1) {
          _this3.goBack();
          return;
        }
        _this3.loadEvents(_this3.state);
      }).catch(function (error) {
        var errors = new __WEBPACK_IMPORTED_MODULE_5__helpers_Errors__["a" /* default */](error);
        if (errors.has('general')) {
          alert(error.first('general'));
        }
      });
    }
  }, {
    key: 'renderEvent',
    value: function renderEvent(event) {
      var _this4 = this;

      var start = event.formatted_start_date;
      var end = event.formatted_end_date;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: event.id, className: 'column is-4' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card card-equal-height' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'header',
            { className: 'card-header' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h3',
              { className: 'card-header-title', title: event.title },
              event.title
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'section',
            { className: 'card-content content mb-none p-0' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Description'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'mb-1' },
              event.description.split('\n').map(function (desc, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { key: key },
                  desc
                );
              })
            ),
            event.location ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Location'
            ) : null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'mb-1' },
              event.location ? event.location.split('\n').map(function (address, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { key: key },
                  address
                );
              }) : null
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Dates'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'mb-1' },
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
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Created By'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],
              { to: '/user/' + event.user.id },
              event.user.name
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'is-flex mb-none mt-1' },
              event.link ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: event.link,
                  className: 'button is-small is-info' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-' + (event.platform ? event.platform.toLowerCase() : '') + ' mr-0' }),
                'View Event',
                event.platform ? ' on ' + event.platform : ''
              ) : null,
              event.location ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://www.google.com/maps/search/?api=1&query=' + event.location.split('\n').join(' '),
                  className: 'button is-small is-success ml-auto' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-map-marker mr-0' }),
                'Map it'
              ) : null
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'footer',
            { className: 'card-footer' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: 'javascript:void(0);', className: 'card-footer-item', onClick: function onClick() {
                  return _this4.openEventsModal(event);
                } },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-edit mr-0' }),
              'Edit'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: 'javascript:void(0);', className: 'card-footer-item text-danger', onClick: function onClick() {
                  return _this4.delete(event);
                } },
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
      var _this5 = this;

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
              return _this5.goBack();
            },
            disabled: this.state.prev_page === null },
          'Previous'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'button',
            className: 'pagination-next',
            onClick: function onClick() {
              return _this5.goForward();
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
                  className: 'pagination-link' + (_this5.state.page === page ? ' is-current' : ''),
                  'aria-label': 'Go to page ' + page,
                  title: 'Go to page ' + page,
                  onClick: function onClick() {
                    _this5.goTo(page);
                  } },
                page
              )
            );
          })
        )
      );
    }
  }, {
    key: 'openEventsModal',
    value: function openEventsModal(event) {
      this.setState({
        showEventFrom: true,
        selectedEvent: event
      });
    }
  }, {
    key: 'closeEventsModal',
    value: function closeEventsModal() {
      this.setState({
        selectedEvent: null,
        showEventFrom: false
      });
    }
  }, {
    key: 'renderEventForm',
    value: function renderEventForm() {
      var _this6 = this;

      if (this.state.showEventFrom === false) {
        return null;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'modal is-active' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'modal-background' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'modal-content' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'box' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'is-flex' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h3',
                { className: 'title is-4' },
                this.state.selectedEvent ? 'Edit Event' : 'Create New Event'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', { type: 'button', className: 'delete ml-auto', onClick: this.closeEventsModal.bind(this) })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_EventForm__["a" /* default */], {
              onSubmit: function onSubmit(event) {
                _this6.loadEvents(_this6.state);
                _this6.closeEventsModal();
                __WEBPACK_IMPORTED_MODULE_6__components_Notify__["a" /* default */].push('Event "' + event.title + '" was created successfully');
              },
              onUpdate: function onUpdate(event) {
                _this6.loadEvents(_this6.state);
                _this6.closeEventsModal();
                __WEBPACK_IMPORTED_MODULE_6__components_Notify__["a" /* default */].push('Event "' + event.title + '" was updated successfully');
              },
              event: this.state.selectedEvent,
              onCancel: this.closeEventsModal.bind(this)
            })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

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
              { className: 'button is-primary', type: 'button', onClick: function onClick() {
                  return _this7.openEventsModal(null);
                } },
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
        this.renderEventForm(),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return EventsScene;
}(__WEBPACK_IMPORTED_MODULE_7__scenes_Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (EventsScene);

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

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Notify = function (_Component) {
  _inherits(Notify, _Component);

  function Notify(props) {
    _classCallCheck(this, Notify);

    var _this = _possibleConstructorReturn(this, (Notify.__proto__ || Object.getPrototypeOf(Notify)).call(this, props));

    _this.state = {
      show: false,
      hiding: false,
      marginTop: window.scrollY > 70 ? -40 : 0
    };
    return _this;
  }

  _createClass(Notify, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.timer = setTimeout(function () {
        _this2.hide();
      }, 5000);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      setTimeout(function () {
        _this3.setState({ show: true });
      }, 100);

      window.addEventListener('scroll', this.handleWindowScroll.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleWindowScroll.bind(this));
    }
  }, {
    key: 'handleWindowScroll',
    value: function handleWindowScroll() {
      var marginTop = window.scrollY > 70 ? -40 : 0;
      this.setState({ marginTop: marginTop });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({ hiding: true });
      clearTimeout(this.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = '';

      switch (this.props.type) {
        case 'success':
        case 'danger':
        case 'info':
        case 'warning':
          classes = 'is-' + this.props.type;
          break;
        default:
          classes = 'is-success';
      }

      classes += this.state.show ? ' show' : '';
      classes += this.state.hiding ? ' hiding' : '';

      var marginTop = this.state.marginTop;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'notification push-notification ' + classes, style: { marginTop: marginTop + 'px' } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', { type: 'button', className: 'delete', onClick: this.hide.bind(this) }),
        this.props.message
      );
    }
  }], [{
    key: '_remove',
    value: function _remove() {
      if (this.stack && this.stack.length > 0) {
        document.body.removeChild(this.stack.shift());
      }
    }
  }, {
    key: 'push',
    value: function push(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

      var container = document.createElement('div');

      __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Notify, { message: message, type: type, container: container }), container);

      document.body.appendChild(container);

      if (this.stack.length > 0) {
        this._remove();
      }

      this.stack.push(container);
    }
  }]);

  return Notify;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Notify);


Notify.propTypes = {
  message: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string.isRequired,
  type: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  container: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired
};

Notify.defaultProps = {
  type: 'success'
};

Notify.stack = [];

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var code_responses = {
  '500': 'Server error 500: Please try again later',
  '404': 'some 404 error',
  '422': 'some 422 error',
  '401': 'You are not logged in!Please log in to upload to the server.',
  '403': 'Authorization error: You don\'t have permission to access that observation.'
};

var Errors = function () {
  /**
   * Construct the object.
   *
   * @param error
   */
  function Errors(error) {
    _classCallCheck(this, Errors);

    this.errors = {};

    this.responses = code_responses;

    if (typeof error === 'string') {
      this.errors = { general: [error] };
      return;
    }

    if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
      this.errorCode = error.response ? error.response.status : -1;
    }

    this._extractErrors(error);
  }

  /**
   * Get all errors.
   *
   * @return {{}|*|{general: string[]}}
   */


  _createClass(Errors, [{
    key: 'all',
    value: function all() {
      return this.errors;
    }

    /**
     * Get the first error in for a field.
     *
     * @param field
     * @return {*}
     */

  }, {
    key: 'first',
    value: function first(field) {
      return this.errors[field][0];
    }

    /**
     * Returns the responses used for different error codes: handy for testing.
     *
     * @return {{Object}}
     */

  }, {
    key: 'fetchCodes',
    value: function fetchCodes() {
      return this.responses;
    }

    /**
     * Get all errors for a given field.
     *
     * @param field
     * @return {Array}
     */

  }, {
    key: 'getField',
    value: function getField(field) {
      if (this.errors[field]) {
        return this.errors[field];
      }
    }

    /**
     * Sets the errors object based on the errorCode.
     *
     * @private
     */

  }, {
    key: '_extractErrors',
    value: function _extractErrors(errors) {
      switch (this.errorCode) {
        case 401:
          this.errors = { general: [this.responses['401']] };
          break;
        case 403:
          this.errors = { general: [this.responses['403']] };
          break;
        case 404:
          this.errors = { general: [this.responses['404']] };
          break;
        case 500:
          this.errors = { general: [this.responses['500']] };
          break;
        case 422:
          // There are 422 with custom errors, and 422s that are form validation rejections
          var data = errors.response.data;

          if (data.error) {
            if (typeof data.error === 'string') {
              // Its a single error message
              this.errors = {
                general: [data.error]
              };
            } else {
              this.errors = data.error;
            }
          } else {
            // Its a set of {field: [message]} pairs
            this.errors = data;
          }
          break;
        default:
          // No error code or error code was -1
          this.errors = {
            general: ['Network error!  Please check your internet connection and try again.']
          };
          break;
      }
    }

    /**
     * Checks if an error exists for a given field.
     *
     * @param field
     * @return {boolean}
     */

  }, {
    key: 'has',
    value: function has(field) {
      return this.errors.hasOwnProperty(field);
    }

    /**
     * Checks if any errors exist.
     *
     * @return {boolean}
     */

  }, {
    key: 'any',
    value: function any() {
      return Object.keys(this.errors).length > 0;
    }

    /**
     * clear error.
     *
     * @param field
     */

  }, {
    key: 'clear',
    value: function clear(field) {
      if (this.errors.hasOwnProperty(field)) {
        delete this.errors[field];
      }

      return this;
    }
  }]);

  return Errors;
}();

/* harmony default export */ __webpack_exports__["a"] = (Errors);

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Calendar__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_Errors__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Notify__ = __webpack_require__(280);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var EventForm = function (_Component) {
  _inherits(EventForm, _Component);

  function EventForm(props) {
    _classCallCheck(this, EventForm);

    var _this = _possibleConstructorReturn(this, (EventForm.__proto__ || Object.getPrototypeOf(EventForm)).call(this, props));

    _this.state = {
      id: null,
      title: '',
      timezone: '',
      start_date: __WEBPACK_IMPORTED_MODULE_2_moment___default()().minute(0).hour(0),
      end_date: __WEBPACK_IMPORTED_MODULE_2_moment___default()().minute(0).hour(0),
      link: '',
      include_time: true,
      description: '',
      location: '',
      platform: '',
      loading: false,
      errors: new __WEBPACK_IMPORTED_MODULE_4__helpers_Errors__["a" /* default */]('')
    };
    return _this;
  }

  _createClass(EventForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var event = this.props.event;


      if (event !== null) {
        var start_date = __WEBPACK_IMPORTED_MODULE_2_moment___default()(event.start_date, 'YYYY-MM-DD HH:mm:ss');
        var end_date = __WEBPACK_IMPORTED_MODULE_2_moment___default()(event.end_date, 'YYYY-MM-DD HH:mm:ss');
        this.setState({
          id: event.id,
          title: event.title || '',
          timezone: event.timezone || '',
          start_date: start_date,
          end_date: end_date,
          link: event.link || '',
          description: event.description || '',
          location: event.location || '',
          platform: event.platform || '',
          include_time: event.has_start_time && event.has_end_time
        });
      }
    }
  }, {
    key: 'save',
    value: function save() {
      this.setState({ loading: true });
      var event = this.props.event;

      if (event !== null) {
        this.update();
        return;
      }

      this.submit();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      var data = this.getData();
      axios.put('/admin/web/event/' + data.id, data).then(function (response) {
        _this2.setState({ loading: false });
        _this2.props.onUpdate(response.data.data);
      }).catch(function (error) {
        _this2.setState({ loading: false });
        var errors = new __WEBPACK_IMPORTED_MODULE_4__helpers_Errors__["a" /* default */](error);
        _this2.setState({
          errors: errors
        });

        if (errors.has('general')) {
          alert(errors.first('general'));
        } else {
          __WEBPACK_IMPORTED_MODULE_5__components_Notify__["a" /* default */].push('Validation error. Please review submission.', 'danger');
        }
      });
    }
  }, {
    key: 'submit',
    value: function submit() {
      var _this3 = this;

      var data = this.getData();
      axios.post('/admin/web/events', data).then(function (response) {
        _this3.setState({ loading: false });
        _this3.props.onSubmit(response.data.data);
      }).catch(function (error) {
        _this3.setState({ loading: false });
        var errors = new __WEBPACK_IMPORTED_MODULE_4__helpers_Errors__["a" /* default */](error);
        _this3.setState({
          errors: errors
        });

        if (errors.has('general')) {
          alert(errors.first('general'));
        } else {
          __WEBPACK_IMPORTED_MODULE_5__components_Notify__["a" /* default */].push('Validation error. Please review submission.', 'danger');
        }
      });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var data = _extends({}, this.state, {
        start_date: this.state.start_date.format('YYYY-MM-DD HH:mm:ss'),
        end_date: this.state.end_date.format('YYYY-MM-DD HH:mm:ss'),
        has_start_time: this.state.include_time,
        has_end_time: this.state.include_time
      });

      delete data.errors;
      delete data.loading;

      return data;
    }
  }, {
    key: 'clearError',
    value: function clearError(e) {
      this.state.errors.clear(e.nativeEvent.target.name);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var errors = this.state.errors;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { method: 'post',
          action: '/admin/web/events',
          onSubmit: function onSubmit(_ref) {
            var nativeEvent = _ref.nativeEvent;
            return nativeEvent.preventDefault();
          },
          onKeyDown: function onKeyDown(e) {
            return _this4.clearError(e);
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Title',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'text-danger' },
              '*'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'input',
              name: 'title',
              value: this.state.title,
              onChange: function onChange(_ref2) {
                var target = _ref2.target;
                return _this4.setState({ title: target.value });
              },
              placeholder: 'Event title' }),
            errors.has('title') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('title')
            ) : null
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Description',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'text-danger' },
              '*'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { className: 'textarea',
              name: 'description',
              value: this.state.description,
              onChange: function onChange(_ref3) {
                var target = _ref3.target;
                return _this4.setState({ description: target.value });
              },
              placeholder: 'Event description' }),
            errors.has('description') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('description')
            ) : null
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Start Date and Time',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'text-danger' },
              '*'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'checkbox' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox',
                style: { marginRight: '10px' },
                value: true,
                onChange: function onChange() {
                  return _this4.setState({ include_time: !_this4.state.include_time });
                },
                checked: this.state.include_time }),
              'Include time'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Calendar__["a" /* default */], { date: this.state.start_date,
              onChange: function onChange(start_date) {
                return _this4.setState({ start_date: start_date });
              },
              includeTime: this.state.include_time }),
            errors.has('start_date') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('start_date')
            ) : null
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'End Date and Time',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'text-danger' },
              '*'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Calendar__["a" /* default */], { date: this.state.end_date,
              onChange: function onChange(end_date) {
                return _this4.setState({ end_date: end_date });
              },
              includeTime: this.state.include_time }),
            errors.has('end_date') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('end_date')
            ) : null
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Timezone',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'text-danger' },
              '*'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'input',
              name: 'timezone',
              value: this.state.timezone,
              placeholder: '3-letter timezone such as EST',
              onChange: function onChange(_ref4) {
                var target = _ref4.target;
                return _this4.setState({ timezone: target.value });
              } }),
            errors.has('timezone') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('timezone')
            ) : null
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label is-flex' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              'Location'
            ),
            this.state.location.length !== 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { className: 'ml-auto font-weight-normal text-small',
                href: 'https://www.google.com/maps/search/?api=1&query=' + this.state.location.split('\n').join(' '),
                target: '_blank' },
              'View on Map',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'small',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'ml-0 fa fa-external-link' })
              )
            ) : null
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { className: 'textarea',
              name: 'location',
              value: this.state.location,
              onChange: function onChange(_ref5) {
                var target = _ref5.target;
                return _this4.setState({ location: target.value });
              },
              placeholder: 'Example address:\n1314 Example St.\nSan Diego, CA 12345' }),
            errors.has('location') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('location')
            ) : null
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Link to Event'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'input',
              name: 'link',
              value: this.state.link,
              onChange: function onChange(_ref6) {
                var target = _ref6.target;
                return _this4.setState({ link: target.value });
              },
              placeholder: 'Optional. Example: https://www.facebook.com/events/1234567891011' }),
            errors.has('link') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('link')
            ) : null
          )
        ),
        this.state.link.length !== 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Link Platform'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'input',
              name: 'platform',
              value: this.state.platform,
              onChange: function onChange(_ref7) {
                var target = _ref7.target;
                return _this4.setState({ platform: target.value });
              },
              placeholder: 'Optional. Examples: Facebook or Eventbee' }),
            errors.has('platform') ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger' },
              errors.first('platform')
            ) : null
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: 'help' },
            'When provided, the link will appear as "',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: this.state.link, target: '_blank' },
              'View event on ',
              this.state.platform || 'platform'
            ),
            '" on the event page.'
          )
        ) : null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field is-flex' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { type: 'button',
              onClick: this.save.bind(this),
              className: 'button is-primary' + (this.state.loading ? ' is-loading' : ''),
              disabled: this.state.loading },
            'Save'
          ),
          typeof this.props.onCancel === 'function' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { type: 'button',
              className: 'button ml-auto',
              onClick: function onClick() {
                return _this4.props.onCancel();
              } },
            'Cancel'
          ) : null
        )
      );
    }
  }]);

  return EventForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (EventForm);


EventForm.propTypes = {
  event: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  onCreate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onCancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

EventForm.defaultProps = {
  event: null,
  onCreate: function onCreate() {},
  onUpdate: function onUpdate() {},

  onCancel: null
};

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    var date = __WEBPACK_IMPORTED_MODULE_2_moment___default()();

    _this.state = {
      date: date,
      months: _this.generateMonths(),
      years: _this.generateYears(date),
      days: _this.generateDays(date),
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      minutes: [0, 15, 30, 45]
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.date.isSame(this.state.date)) {
        this.setState({ date: nextProps.date });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.date !== null) {
        this.setState({ date: this.props.date });
      }
    }
  }, {
    key: 'generateMonths',
    value: function generateMonths() {
      var months = [];
      var startMonth = __WEBPACK_IMPORTED_MODULE_2_moment___default()().day(1);
      for (var month = 1; month <= 12; ++month) {
        months.push(startMonth.month(month - 1).format('MMMM'));
      }

      return months;
    }
  }, {
    key: 'generateYears',
    value: function generateYears(date) {
      var years = [];
      var initialYear = Math.min(__WEBPACK_IMPORTED_MODULE_2_moment___default()().year(), date.year());
      for (var year = initialYear; year <= initialYear + 5; ++year) {
        years.push(year);
      }

      return years;
    }
  }, {
    key: 'generateDays',
    value: function generateDays(date) {
      var days = [];
      var daysInMonth = date.daysInMonth();
      for (var day = 1; day <= daysInMonth; ++day) {
        days.push(day);
      }

      return days;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'is-flex' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mr-0' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label font-weight-normal' },
            'Month'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'select' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { name: 'month',
                value: this.state.date.format('MMMM'),
                onChange: function onChange(_ref) {
                  var target = _ref.target;

                  var date = _this2.state.date.month(target.value);
                  var days = _this2.generateDays(date);
                  _this2.setState({
                    date: date,
                    days: days
                  });
                } },
              this.state.months.map(function (month, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: month, key: key },
                  month
                );
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mr-0' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label font-weight-normal' },
            'Day'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'select' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { name: 'day',
                value: this.state.date.date(),
                onChange: function onChange(_ref2) {
                  var target = _ref2.target;

                  var date = _this2.state.date.date(target.value);
                  _this2.setState({ date: date });
                } },
              this.state.days.map(function (day, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: day, key: key },
                  day
                );
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mr-1' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label font-weight-normal' },
            'Year'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'select' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { name: 'year',
                value: this.state.date.year(),
                onChange: function onChange(_ref3) {
                  var target = _ref3.target;

                  var date = _this2.state.date.year(target.value);
                  _this2.setState({ date: date });
                } },
              this.state.years.map(function (year, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: year, key: key },
                  year
                );
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mr-0' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label font-weight-normal' },
            'Hour'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'select' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { name: 'hour',
                value: this.state.date.hour(),
                onChange: function onChange(_ref4) {
                  var target = _ref4.target;

                  var date = _this2.state.date.hour(target.value);
                  _this2.setState({ date: date });
                },
                disabled: !this.props.includeTime },
              this.state.hours.map(function (hour, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: hour, key: key },
                  hour
                );
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mr-0' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label font-weight-normal' },
            'Minute'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'select' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { name: 'hour',
                value: this.state.date.minute(),
                onChange: function onChange(_ref5) {
                  var target = _ref5.target;

                  var date = _this2.state.date.minute(target.value);
                  _this2.setState({
                    date: date
                  });
                },
                disabled: !this.props.includeTime },
              this.state.minutes.map(function (minute, key) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: minute, key: key },
                  minute
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Calendar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Calendar);


Calendar.propTypes = {
  date: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  includeTime: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Calendar.defaultProps = {
  date: __WEBPACK_IMPORTED_MODULE_2_moment___default()(),
  includeTime: true
};

/***/ })

});