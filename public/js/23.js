webpackJsonp([23],{

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Spinner__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Notify__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_EventEmitter__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__GroupSearchForm__ = __webpack_require__(569);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var Groups = function (_Component) {
  _inherits(Groups, _Component);

  function Groups(props) {
    _classCallCheck(this, Groups);

    var _this = _possibleConstructorReturn(this, (Groups.__proto__ || Object.getPrototypeOf(Groups)).call(this, props));

    _this.state = {
      name: '',
      share: false,
      isPrivate: 0,
      errors: {
        share: [],
        name: [],
        isPrivate: []
      },
      groups: [],
      success: false,
      loading: false
    };

    document.title = 'Groups - TreeSnap';
    return _this;
  }

  /**
   * Get groups from server.
   */


  _createClass(Groups, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.setState({ loading: true });
      axios.get('/web/groups').then(function (response) {
        var data = response.data.data;
        _this2.setState({
          groups: data,
          loading: false
        });
      }).catch(function (error) {
        console.log(error);
        _this2.setState({ loading: false });
      });
    }

    /**
     * Render groups table.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderGroupsTable',
    value: function _renderGroupsTable() {
      if (this.state.groups.length === 0) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'There are no available groups yet. You can create a group using the form below.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'If someone else invites you to join their group, the group will show up here once you accept the invitation.'
          )
        );
      }

      var admin = this.props.admin;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'table',
        { className: 'table is-striped mb-none', id: 'groups-table' },
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
              null,
              'Users'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'Leader'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'Date Created'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          this.state.groups.map(function (group, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              { key: index },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_4_react_router_dom__["b" /* Link */],
                  { to: (!admin ? '/account' : '') + '/group/' + group.id },
                  group.name,
                  ' ',
                  group.owner.name === 'You' && group.group_requests_count > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'i',
                    { className: 'tag is-success' },
                    group.group_requests_count,
                    ' pending requests'
                  ) : null
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                group.users_count
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                group.owner.name
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                __WEBPACK_IMPORTED_MODULE_3_moment___default()(group.created_at).format('MMM Do, YYYY')
              )
            );
          })
        )
      );
    }

    /**
     * Render add group form.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderForm',
    value: function _renderForm() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { action: '#', onSubmit: this.submit.bind(this) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Group Name'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control is-expanded' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'limit-width input' + (this.state.errors.name.length > 0 ? ' is-danger' : ''),
              value: this.state.name,
              placeholder: 'Group Name',
              onChange: function onChange(_ref) {
                var target = _ref.target;
                return _this3.setState({ name: target.value });
              }
            }),
            this.state.errors.name.map(function (error, index) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'help is-danger', key: index },
                error
              );
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Discoverability'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control is-expanded' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'select' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'select',
                { value: this.state.isPrivate,
                  onChange: function onChange(_ref2) {
                    var target = _ref2.target;
                    return _this3.setState({ isPrivate: parseInt(target.value) });
                  } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: 1 },
                  'Users must be invited to join'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: 0 },
                  'Allow anyone to find this group and apply to join'
                )
              )
            ),
            this.state.errors.isPrivate.map(function (error, index) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'help is-danger', key: index },
                error
              );
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'checkbox' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox',
                className: 'mr-0',
                onChange: function onChange(_ref3) {
                  var target = _ref3.target;
                  return _this3.setState({ share: target.checked });
                },
                checked: this.state.share }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                null,
                'Share all of my observations with members of this group including accurate location coordinates'
              )
            )
          ),
          this.state.errors.share.map(function (error, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help is-danger', key: index },
              error
            );
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { type: 'submit', className: 'button is-primary' },
              'Create Group'
            )
          )
        )
      );
    }

    /**
     * Handle submit button.
     *
     * @param e
     */

  }, {
    key: 'submit',
    value: function submit(e) {
      var _this4 = this;

      e.preventDefault();
      axios.post('/web/groups', {
        name: this.state.name,
        share: this.state.share,
        is_private: this.state.isPrivate === 1
      }).then(function (response) {
        var data = response.data.data;
        var groups = _this4.state.groups;
        groups.push(data);
        _this4.setState({
          name: '',
          groups: groups,
          errors: {
            name: [],
            share: [],
            isPrivate: []
          }
        });
        __WEBPACK_IMPORTED_MODULE_5__Notify__["a" /* default */].push('Group created successfully.');
        __WEBPACK_IMPORTED_MODULE_6__helpers_EventEmitter__["a" /* default */].emit('user.groups.updated');
      }).catch(function (error) {
        if (error.response && error.response.status === 422) {
          var errors = error.response.data;
          _this4.setState({
            errors: {
              name: errors.name || [],
              share: errors.share || [],
              isPrivate: errors.is_private || []
            }
          });
        }
      });
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
          'User Groups'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h4',
            { className: 'title is-4' },
            'Groups'
          ),
          this._renderGroupsTable()
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'columns is-multiline' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'column is-12-tablet is-6-desktop is-6-fullhd' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'box' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h2',
                { className: 'title is-4' },
                'Create New Group'
              ),
              this._renderForm()
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'column is-12-tablet is-6-desktop is-6-fullhd' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'box' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h2',
                { className: 'title is-4' },
                'Join a Group'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'mb-1' },
                'Search and apply to join public groups'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__GroupSearchForm__["a" /* default */], null)
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return Groups;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Groups);


Groups.propTypes = {
  admin: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Groups.defaultProps = {
  admin: true
};

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

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Notify__ = __webpack_require__(280);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var GroupSearchForm = function (_Component) {
  _inherits(GroupSearchForm, _Component);

  function GroupSearchForm(props) {
    _classCallCheck(this, GroupSearchForm);

    var _this = _possibleConstructorReturn(this, (GroupSearchForm.__proto__ || Object.getPrototypeOf(GroupSearchForm)).call(this, props));

    _this.state = {
      searchTerm: '',
      groups: [],
      loading: false,
      joiningGroup: -1,
      seeMore: false
    };
    return _this;
  }

  /**
   * Perform an initial search
   */


  _createClass(GroupSearchForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.search();
    }

    /**
     * Perform the search and set the results.
     *
     * @param searchTerm
     */

  }, {
    key: 'search',
    value: function search(searchTerm) {
      var _this2 = this;

      if (typeof searchTerm !== 'undefined') {
        this.setState({ searchTerm: searchTerm });
      } else {
        searchTerm = '';
      }

      axios.get('/web/groups/search', {
        params: {
          term: searchTerm
        }
      }).then(function (response) {
        _this2.setState({ groups: response.data.data });
      }).catch(function (error) {
        console.log(error);
      });
    }

    /**
     * Toggle joining status.
     *
     * @param group
     */

  }, {
    key: 'join',
    value: function join(group) {
      var _this3 = this;

      // Prevent multiple requests
      if (this.state.joiningGroup !== -1) {
        return;
      }

      this.setState({
        joiningGroup: group.id,
        loading: true
      });

      axios.post('/web/groups/join/' + group.id).then(function (response) {
        __WEBPACK_IMPORTED_MODULE_1__Notify__["a" /* default */].push(response.data.data);

        _this3.setState({
          joiningGroup: -1,
          loading: false
        });

        _this3.search(_this3.state.searchTerm);
      }).catch(function (error) {
        _this3.setState({
          joiningGroup: -1,
          loading: false
        });

        if (!error.response) {
          __WEBPACK_IMPORTED_MODULE_1__Notify__["a" /* default */].push('Network error! Please try again later', 'danger');
          return;
        }

        var response = error.response;

        switch (response.status) {
          case 404:
            __WEBPACK_IMPORTED_MODULE_1__Notify__["a" /* default */].push('Unknown group selected! Please select a valid group', 'danger');
            break;
          case 422:
            if (response.data.error) {
              __WEBPACK_IMPORTED_MODULE_1__Notify__["a" /* default */].push(response.data.error, 'danger');
            } else {
              __WEBPACK_IMPORTED_MODULE_1__Notify__["a" /* default */].push('Unknown error! Please try again later', 'danger');
            }
            break;
          default:
            __WEBPACK_IMPORTED_MODULE_1__Notify__["a" /* default */].push('Internal server error! Please try again later', 'danger');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var groups = this.state.seeMore ? this.state.groups : this.state.groups.slice(0, 4);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field mb-1' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'search',
              className: 'input',
              placeholder: 'Type to search...',
              onChange: function onChange(_ref) {
                var target = _ref.target;
                return _this4.search(target.value);
              },
              value: this.state.searchTerm })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'table',
          { className: 'table has-text-vertically-centered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tbody',
            null,
            groups.length === 0 && this.state.searchTerm.length > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                { colSpan: 3, className: 'has-text-grey' },
                'No results found'
              )
            ) : null,
            groups.map(function (group) {
              var classes = _this4.state.joiningGroup === group.id ? ' is-loading' : ' is-outlined';
              classes += group.has_request ? ' is-warning' : ' is-success';
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'tr',
                { key: group.id },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  group.name
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  group.users_count,
                  ' Members'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  { className: 'has-text-right' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { type: 'button',
                      className: 'button is-small' + classes,
                      disabled: _this4.state.loading && _this4.state.joiningGroup !== group.id,
                      onClick: function onClick() {
                        return _this4.join(group);
                      } },
                    !group.has_request ? 'Join' : 'Pending'
                  )
                )
              );
            })
          )
        ),
        this.state.groups.length > 4 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: 'javascript:;',
            className: 'is-block has-text-centered',
            onClick: function onClick() {
              return _this4.setState({ seeMore: !_this4.state.seeMore });
            } },
          this.state.seeMore ? 'See Less' : 'See More'
        ) : null
      );
    }
  }]);

  return GroupSearchForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (GroupSearchForm);

/***/ })

});