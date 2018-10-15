webpackJsonp([12,23],{

/***/ 211:
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

/***/ 213:
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

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Groups__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AccountView__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Scene__ = __webpack_require__(277);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var GroupsScene = function (_Scene) {
  _inherits(GroupsScene, _Scene);

  function GroupsScene() {
    _classCallCheck(this, GroupsScene);

    return _possibleConstructorReturn(this, (GroupsScene.__proto__ || Object.getPrototypeOf(GroupsScene)).apply(this, arguments));
  }

  _createClass(GroupsScene, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.fixHeight();
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_AccountView__["a" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Groups__["default"], _extends({ admin: false }, this.props))
      );
    }
  }]);

  return GroupsScene;
}(__WEBPACK_IMPORTED_MODULE_3__Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (GroupsScene);

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

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_Path__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_User__ = __webpack_require__(33);
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


Navbar.propTypes = {
  container: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  home: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Navbar.defaultProps = {
  container: false,
  home: false
};

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(33);
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

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(31);
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


LinksSidebar.propTypes = {
  links: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

LinksSidebar.defaultProps = {
  title: ''
};

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(211);
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

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_AccountLinks__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Navbar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_HomeFooter__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_LinksSidebar__ = __webpack_require__(305);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var AccountView = function (_Component) {
  _inherits(AccountView, _Component);

  function AccountView() {
    _classCallCheck(this, AccountView);

    return _possibleConstructorReturn(this, (AccountView.__proto__ || Object.getPrototypeOf(AccountView)).apply(this, arguments));
  }

  _createClass(AccountView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Navbar__["a" /* default */], null),
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
                { className: 'column is-narrow account-sidebar-container' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_LinksSidebar__["a" /* default */], { links: __WEBPACK_IMPORTED_MODULE_1__helpers_AccountLinks__["a" /* default */], title: 'Members' })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'column' },
                this.props.children
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_HomeFooter__["a" /* default */], null)
      );
    }
  }]);

  return AccountView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (AccountView);

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var AccountLinks = [{
  to: '/account',
  icon: 'fa-address-card-o',
  label: 'Settings'
}, {
  to: '/account/observations',
  icon: 'fa-tree',
  label: 'Observations'
}, {
  to: '/account/groups',
  icon: 'fa-users',
  label: 'Groups'
}, {
  to: '/account/collections',
  icon: 'fa-th',
  label: 'Collections'
}, {
  to: '/account/filters',
  icon: 'fa-filter',
  label: 'Filters'
}];

/* harmony default export */ __webpack_exports__["a"] = (AccountLinks);

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