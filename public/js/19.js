webpackJsonp([19],{

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

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_AccountView__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Scene__ = __webpack_require__(277);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var AccountScene = function (_Scene) {
  _inherits(AccountScene, _Scene);

  function AccountScene(props) {
    _classCallCheck(this, AccountScene);

    var _this = _possibleConstructorReturn(this, (AccountScene.__proto__ || Object.getPrototypeOf(AccountScene)).call(this, props));

    _this.state = {
      name: '',
      units: '',
      email: '',
      is_anonymous: 0,
      birth_year: '',
      errors: {
        name: [],
        email: [],
        is_anonymous: [],
        birth_year: [],
        units: []
      },
      message: '',
      new_password: '',
      old_password: '',
      new_password_confirmation: '',
      password_errors: [],
      password_message: '',
      provider: '',
      has_password: true
    };

    document.title = 'User Account';
    return _this;
  }

  /**
   * Get the user record from the server.
   */


  _createClass(AccountScene, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      axios.get('/web/user').then(function (response) {
        var user = response.data.data;
        _this2.setState({
          name: user.name,
          units: user.units,
          email: user.email,
          is_anonymous: user.is_anonymous ? 1 : 0,
          birth_year: user.birth_year,
          provider: user.provider,
          has_password: user.has_password
        });

        window.fixHeight();
      }).catch(function (error) {
        console.log(error);
      });
    }

    /**
     * Submit personal info form.
     *
     * @param e Event
     */

  }, {
    key: 'submit',
    value: function submit(e) {
      var _this3 = this;

      e.preventDefault();

      axios.put('/web/user', {
        name: this.state.name,
        email: this.state.email,
        is_anonymous: this.state.is_anonymous,
        birth_year: this.state.birth_year,
        units: this.state.units
      }).then(function (response) {
        var user = response.data.data;

        _this3.setState({
          name: user.name,
          email: user.email,
          units: user.units,
          is_anonymous: user.is_anonymous ? 1 : 0,
          message: 'Account updated successfully',
          errors: {
            name: [],
            email: [],
            is_anonymous: [],
            birth_year: [],
            units: []
          }
        });

        window.TreeSnap.units = user.units;
      }).catch(function (error) {
        if (error.response && error.response.status === 422) {
          var errors = error.response.data;
          _this3.setState({
            message: '',
            errors: {
              name: errors.name || [],
              email: errors.email || [],
              is_anonymous: errors.is_anonymous || [],
              birth_year: errors.birth_year || []
            }
          });
        }
      });
    }

    /**
     * Submit password form.
     *
     * @param e Event
     */

  }, {
    key: 'submitPassword',
    value: function submitPassword(e) {
      var _this4 = this;

      e.preventDefault();

      axios.patch('/web/user/password', {
        new_password: this.state.new_password,
        new_password_confirmation: this.state.new_password_confirmation,
        old_password: this.state.old_password
      }).then(function (response) {
        _this4.setState({
          password_message: response.data.data,
          password_errors: [],
          new_password: '',
          new_password_confirmation: '',
          old_password: ''
        });
      }).catch(function (error) {
        if (error.response && error.response.status === 422) {
          var errors = error.response.data;
          var password_errors = [];
          // flatten errors
          Object.keys(errors).map(function (key) {
            errors[key].map(function (e) {
              return password_errors.push(e);
            });
          });
          _this4.setState({ password_errors: password_errors, password_message: '' });
        }
      });
    }

    /**
     * Render password errors.
     *
     * @returns {XML}
     */

  }, {
    key: 'renderPasswordErrors',
    value: function renderPasswordErrors() {
      if (this.state.password_errors.length === 0) {
        return;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'alert is-danger' },
        this.state.password_errors.map(function (error, index) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { key: index },
            error
          );
        })
      );
    }
  }, {
    key: 'renderPasswordForm',
    value: function renderPasswordForm() {
      var _this5 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'box' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          { className: 'title is-4' },
          'Change Password'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'form',
          { action: '#', method: 'post', onSubmit: this.submitPassword.bind(this) },
          this.renderPasswordErrors(),
          this.state.password_message !== '' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert is-success' },
            this.state.password_message
          ) : null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field limit-width' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Old Password'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password',
                className: 'input',
                placeholder: 'Old password',
                value: this.state.old_password,
                onChange: function onChange(e) {
                  return _this5.setState({ old_password: e.target.value });
                } })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field limit-width' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'New Password'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password',
                className: 'input',
                placeholder: 'New password',
                value: this.state.new_password,
                onChange: function onChange(e) {
                  return _this5.setState({ new_password: e.target.value });
                } })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field limit-width' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Repeat Password'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password',
                className: 'input',
                placeholder: 'Repeat new password',
                value: this.state.new_password_confirmation,
                onChange: function onChange(e) {
                  return _this5.setState({ new_password_confirmation: e.target.value });
                } })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field mt-1' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { type: 'submit',
                  className: 'button is-primary' },
                'Update Password'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'submitNewPassword',
    value: function submitNewPassword(e) {
      var _this6 = this;

      e.preventDefault();

      axios.post('/web/user/create-password', {
        password: this.state.new_password,
        password_confirmation: this.state.new_password_confirmation
      }).then(function (response) {
        _this6.setState({
          has_password: true,
          password_message: 'Password created successfully. You may now login using your email and new password.',
          new_password: '',
          new_password_confirmation: ''
        });
      }).catch(function (e) {
        if (e.response && e.response.status === 422) {
          _this6.setState({
            password_errors: e.response.data.password
          });
        }

        console.log(e);
      });
    }
  }, {
    key: 'renderCreatePasswordForm',
    value: function renderCreatePasswordForm() {
      var _this7 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'box' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          { className: 'title is-4 mb-1' },
          'Create Password'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'form',
          { action: '#', method: 'post', onSubmit: this.submitNewPassword.bind(this) },
          this.renderPasswordErrors(),
          this.state.password_message !== '' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert is-success' },
            this.state.password_message
          ) : null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert is-warning mb-1' },
            'You are logged in using your ',
            this.state.provider,
            ' account and have not yet set up a password with TreeSnap.',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            'Setting up a password with TreeSnap allows you to login without using third party services such as ',
            this.state.provider,
            '.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field limit-width' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Password'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password',
                className: 'input',
                placeholder: 'New password',
                value: this.state.new_password,
                onChange: function onChange(e) {
                  return _this7.setState({ new_password: e.target.value });
                } })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field limit-width' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Repeat Password'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password',
                className: 'input',
                placeholder: 'Repeat new password',
                value: this.state.new_password_confirmation,
                onChange: function onChange(e) {
                  return _this7.setState({ new_password_confirmation: e.target.value });
                } })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field mt-1' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { type: 'submit',
                  className: 'button is-primary' },
                'Save Password'
              )
            )
          )
        )
      );
    }

    /**
     * Generate birth years.
     * @returns {Array}
     * @private
     */

  }, {
    key: '_generateBirthDateOptions',
    value: function _generateBirthDateOptions() {
      var today = parseInt(__WEBPACK_IMPORTED_MODULE_2_moment___default()().format('YYYY').toString());
      var dates = [];
      for (var i = today; i > today - 101; i--) {
        dates.push(i);
      }
      return dates.map(function (v, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'option',
          { key: i, value: v },
          v
        );
      });
    }

    /**
     * render.
     *
     * @returns {XML}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_AccountView__["a" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-3' },
          'Settings'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            { className: 'title is-4' },
            'Personal Information'
          ),
          this.state.message !== '' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'alert is-success' },
            this.state.message
          ) : null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'form',
            { action: '#',
              method: 'post',
              onSubmit: this.submit.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field limit-width' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { className: 'label' },
                'Name'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'control' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                  className: 'input' + (this.state.errors.name.length > 0 ? ' is-danger' : ''),
                  value: this.state.name,
                  onChange: function onChange(e) {
                    return _this8.setState({ name: e.target.value });
                  } }),
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
              { className: 'field limit-width' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { className: 'label' },
                'Email'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'control' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'email',
                  className: 'input' + (this.state.errors.email.length > 0 ? ' is-danger' : ''),
                  value: this.state.email,
                  onChange: function onChange(e) {
                    return _this8.setState({ email: e.target.value });
                  } }),
                this.state.errors.email.map(function (error, index) {
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
                'Year of Birth'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'select' + (this.state.errors.birth_year.length > 0 ? ' is-danger' : '') },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'select',
                  { type: 'text',
                    className: 'input',
                    value: this.state.birth_year,
                    onChange: function onChange(e) {
                      return _this8.setState({ birth_year: e.target.value });
                    }
                  },
                  this._generateBirthDateOptions()
                )
              ),
              this.state.errors.birth_year.map(function (error, index) {
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
                'label',
                { className: 'label' },
                'Anonymous'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'control' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  {
                    className: 'select' + (this.state.errors.is_anonymous.length > 0 ? ' is-danger' : '') },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'select',
                    { value: this.state.is_anonymous,
                      onChange: function onChange(e) {
                        return _this8.setState({ is_anonymous: e.target.value });
                      } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'option',
                      { value: '0' },
                      'No'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'option',
                      { value: '1' },
                      'Yes'
                    )
                  )
                ),
                this.state.errors.is_anonymous.map(function (error, index) {
                  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    { className: 'help is-danger', key: index },
                    error
                  );
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  { className: 'help' },
                  'Anonymous users have their information hidden from other users.'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { className: 'label' },
                'Measurement Units'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'control' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  {
                    className: 'select' + (this.state.errors.units.length > 0 ? ' is-danger' : '') },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'select',
                    { value: this.state.units,
                      onChange: function onChange(e) {
                        return _this8.setState({ units: e.target.value });
                      } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'option',
                      { value: 'US' },
                      'US (Foot, Inches)'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'option',
                      { value: 'metric' },
                      'Metric (Centimeters, Meters)'
                    )
                  )
                ),
                this.state.errors.units.map(function (error, index) {
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
              { className: 'field mt-1' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'control' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'button',
                  { type: 'submit', className: 'button is-primary' },
                  'Update'
                )
              )
            )
          )
        ),
        this.state.has_password ? this.renderPasswordForm() : this.renderCreatePasswordForm()
      );
    }
  }]);

  return AccountScene;
}(__WEBPACK_IMPORTED_MODULE_3__Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (AccountScene);

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

/***/ })

});