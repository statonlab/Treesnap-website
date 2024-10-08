"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_assets_js_scenes_WelcomeScene_jsx"],{

/***/ "./resources/assets/js/components/Dropdown.jsx":
/*!*****************************************************!*\
  !*** ./resources/assets/js/components/Dropdown.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dropdown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Dropdown = /*#__PURE__*/function (_Component) {
  _inherits(Dropdown, _Component);
  function Dropdown(props) {
    var _this;
    _classCallCheck(this, Dropdown);
    _this = _callSuper(this, Dropdown, [props]);
    _this.state = {
      show: false
    };
    return _this;
  }
  _createClass(Dropdown, [{
    key: "show",
    value: function show() {
      this.setState({
        show: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;
      setTimeout(function () {
        _this2.setState({
          show: false
        });
      }, this.props.timeout);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.state.show) {
        this.hide();
        return;
      }
      this.show();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.handleOutClick.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.addEventListener('click', this.handleOutClick.bind(this));
    }
  }, {
    key: "handleOutClick",
    value: function handleOutClick(event) {
      var target = event.target;
      if (!this.state.show) {
        return;
      }
      if (!this.refs.menu) {
        return;
      }
      if (target !== this.refs.menu && !this.refs.menu.contains(target)) {
        this.hide();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        ref: "menu",
        className: "dropdown".concat(this.state.show ? ' is-active' : '').concat(this.props.right ? ' is-right' : '', " has-text-left"),
        style: {
          width: this.props.isBlock ? '100%' : undefined
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "dropdown-trigger",
          style: {
            width: this.props.isBlock ? '100%' : undefined
          },
          onClick: this.toggle.bind(this),
          children: this.props.trigger
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "dropdown-menu",
          id: "dropdown-menu",
          role: "menu",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "dropdown-content",
            children: this.props.children.map(function (child, k) {
              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
                key: k,
                onClick: function onClick() {
                  setTimeout(_this3.hide.bind(_this3), _this3.props.timeout);
                }
              });
            })
          })
        })]
      });
    }
  }]);
  return Dropdown;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

Dropdown.propTypes = {
  trigger: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired,
  right: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  isBlock: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  timeout: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)
};
Dropdown.defaultProps = {
  right: false,
  isBlock: false,
  timeout: 110
};

/***/ }),

/***/ "./resources/assets/js/components/FeaturesList.jsx":
/*!*********************************************************!*\
  !*** ./resources/assets/js/components/FeaturesList.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FeaturesList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var FeaturesList = /*#__PURE__*/function (_Component) {
  _inherits(FeaturesList, _Component);
  function FeaturesList() {
    _classCallCheck(this, FeaturesList);
    return _callSuper(this, FeaturesList, arguments);
  }
  _createClass(FeaturesList, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "home-section",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
            className: "title is-3 featured-title",
            children: "Application Features"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "tile is-ancestor",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "tile is-parent",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "tile is-child box feature-tile",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "media",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "media-left",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: "/images/flat-icons/earth-globe.png",
                      alt: "Man Icon",
                      className: "feature-icon"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "media-content",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "title",
                      children: "Availability"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
                      className: "feature-text",
                      children: ["TreeSnap is available for iOS and Android smart phones, and is", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b", {
                        children: " completely free"
                      }), ". The app will be available on the Apple AppStore and Google Play."]
                    })]
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "tile is-parent",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "tile is-child box feature-tile",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "media",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "media-left",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: "/images/flat-icons/folder.png",
                      alt: "Man Icon",
                      className: "feature-icon"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "media-content",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "title",
                      children: "It's a Snap"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "feature-text",
                      children: "Come across an ash, hemlock, chestnut, or white oak in the woods? Record it with TreeSnap and its geolocation will be shared with scientists to study it."
                    })]
                  })]
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "tile is-ancestor",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "tile is-parent",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "tile is-child box feature-tile",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "media",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "media-left",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: "/images/flat-icons/archives.png",
                      alt: "Man Icon",
                      className: "feature-icon"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "media-content",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "title",
                      children: "Data Collection"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "feature-text",
                      children: "TreeSnap is easy to use. Snap a photo, answer a few questions and be done in a couple of taps."
                    })]
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "tile is-parent",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "tile is-child box feature-tile",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "media",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "media-left",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: "/images/flat-icons/transfer.png",
                      alt: "Man Icon",
                      className: "feature-icon"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "media-content",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "title",
                      children: "Sync"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "feature-text",
                      children: "Create an account and sync your observations with the TreeSnap server wirelessly."
                    })]
                  })]
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "tile is-ancestor",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "tile is-parent",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "tile is-child box feature-tile",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "media",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "media-left",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: "/images/flat-icons/padlock.png",
                      alt: "Man Icon",
                      className: "feature-icon"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "media-content",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "title",
                      children: "Privacy"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "feature-text",
                      children: "The GPS location of your trees is protected, and not revealed to outside parties. Our map will only display the approximate location of each tree, or you can opt out of adding your data to the map entirely. Only TreeSnap related research programs will have access to this information."
                    })]
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "tile is-parent",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "tile is-child box feature-tile",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "media",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "media-left",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: "/images/flat-icons/teamwork-3.png",
                      alt: "Man Icon",
                      className: "feature-icon"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "media-content",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "title",
                      children: "Contribute"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                      className: "feature-text",
                      children: "Information reported in TreeSnap is used by real scientists. That ash you've found might be the start of a completely new breeding program."
                    })]
                  })]
                })
              })
            })]
          })]
        })
      });
    }
  }]);
  return FeaturesList;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/GetAppRow.jsx":
/*!******************************************************!*\
  !*** ./resources/assets/js/components/GetAppRow.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetAppRow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var GetAppRow = /*#__PURE__*/function (_Component) {
  _inherits(GetAppRow, _Component);
  function GetAppRow(props) {
    var _this;
    _classCallCheck(this, GetAppRow);
    _this = _callSuper(this, GetAppRow, [props]);
    _this.state = {};
    return _this;
  }
  _createClass(GetAppRow, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "is-small mt-3 has-text-centered-mobile",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          href: "https://itunes.apple.com/us/app/treesnap/id1226499160?mt=8",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: "/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg",
            alt: "apple",
            className: "apple-badge-img"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          href: "https://play.google.com/store/apps/details?id=com.treesource",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: "/images/google-play-badge.png",
            alt: "google play badge",
            className: "google-badge-img"
          })
        })]
      });
    }
  }]);
  return GetAppRow;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/HomeFooter.jsx":
/*!*******************************************************!*\
  !*** ./resources/assets/js/components/HomeFooter.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomeFooter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _helpers_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/User */ "./resources/assets/js/helpers/User.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var HomeFooter = /*#__PURE__*/function (_Component) {
  _inherits(HomeFooter, _Component);
  function HomeFooter(props) {
    _classCallCheck(this, HomeFooter);
    return _callSuper(this, HomeFooter, [props]);
  }
  _createClass(HomeFooter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "home-footer",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "columns has-text-centered",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "column is-4",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("b", {
                  children: "Site Map"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/map",
                    children: "Observations Map"
                  })
                }), _helpers_User__WEBPACK_IMPORTED_MODULE_1__["default"].authenticated() ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/account",
                    children: "Your Account"
                  })
                }) : null, !_helpers_User__WEBPACK_IMPORTED_MODULE_1__["default"].authenticated() ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/register",
                    children: "Registration"
                  })
                }) : null, !_helpers_User__WEBPACK_IMPORTED_MODULE_1__["default"].authenticated() ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/login",
                    children: "Login"
                  })
                }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/developer",
                    children: "Developer"
                  })
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "column is-4",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("b", {
                  children: "Resources"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/about",
                    children: "About Us"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/contact",
                    children: "Contact Us"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/partners",
                    children: "Scientific Partners"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/trees",
                    children: "The Trees of TreeSnap"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/faq",
                    children: "Frequently Asked Questions"
                  })
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "column is-4",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                className: 'mb-1',
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("b", {
                  children: "Legal"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/privacy-policy",
                    children: "Privacy Policy"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    href: "/terms-of-use",
                    children: "Terms of Use"
                  })
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "columns logos",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "column has-text-centered",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                href: "https://www.utk.edu/",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                  src: "/images/ut3.png",
                  alt: "University of Tennessee Logo"
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "column has-text-centered",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                href: "https://uky.edu",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                  src: "/images/uky3.png",
                  alt: "University of Kentucky Logo"
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "column has-text-centered",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                href: "https://www.nsf.gov/",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                  src: "/images/nsf1.png",
                  alt: "NSF Logo"
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
            className: 'has-text-centered',
            children: ["Copyright \xA9 ", new Date().getFullYear(), " University of Tennessee Knoxville and University of Kentucky."]
          })]
        })
      });
    }
  }]);
  return HomeFooter;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/HomeJumbotron.jsx":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/HomeJumbotron.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomeJumbotron)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _GetAppRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GetAppRow */ "./resources/assets/js/components/GetAppRow.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var HomeJumbotron = /*#__PURE__*/function (_Component) {
  _inherits(HomeJumbotron, _Component);
  function HomeJumbotron() {
    _classCallCheck(this, HomeJumbotron);
    return _callSuper(this, HomeJumbotron, arguments);
  }
  _createClass(HomeJumbotron, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "container",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "home-inner",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "columns",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "column",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "home-text",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
                  className: "title is-4 mb-none",
                  children: "AVAILABLE NOW"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1", {
                  className: "title is-1",
                  children: "Help Our Nation\u2019s Trees!"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                  className: 'mb-1',
                  children: "Invasive diseases and pests threaten the health of America\u2019s forests. Scientists are working to understand what allows some individual trees to survive, but they need to find healthy, resilient trees in the forest to study. That\u2019s where concerned foresters, landowners, and citizens (you!) can help. Tag trees you find in your community, on your property, or out in the wild using TreeSnap! Scientists will use the data you collect to locate trees for research projects like studying the genetic diversity of tree species and building better tree breeding programs."
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
                    to: "/partners",
                    className: 'button is-borderless',
                    children: "Meet the scientists that use TreeSnap data"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
                    to: {
                      pathname: "https://www.youtube.com/channel/UCw46pEsdYcqwD238Wy56M3A"
                    },
                    target: "_blank",
                    className: 'button is-borderless ml-2 bg-gray',
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                      className: "fa fa-youtube mr-2",
                      size: "lg"
                    }), " Tutorials available on YouTube"]
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_GetAppRow__WEBPACK_IMPORTED_MODULE_1__["default"], {})]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "column is-3 has-text-right mock-container is-hidden-mobile",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                src: "/images/x-mockup-min.png",
                alt: "Mock Device",
                className: "mockup-img"
              })
            })]
          })
        })
      });
    }
  }]);
  return HomeJumbotron;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/Leaderboard.jsx":
/*!********************************************************!*\
  !*** ./resources/assets/js/components/Leaderboard.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Leaderboard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Leaderboard = /*#__PURE__*/function (_React$Component) {
  _inherits(Leaderboard, _React$Component);
  function Leaderboard(props) {
    var _this;
    _classCallCheck(this, Leaderboard);
    _this = _callSuper(this, Leaderboard, [props]);
    _this.state = {
      leaders: [],
      loading: true
    };
    _this.loadLeaders();
    return _this;
  }
  _createClass(Leaderboard, [{
    key: "loadLeaders",
    value: function loadLeaders() {
      var _this2 = this;
      axios.get("/web/leaderboard/".concat(this.props.limit)).then(function (response) {
        _this2.setState({
          leaders: response.data.data,
          loading: false
        });
      })["catch"](function (error) {
        _this2.setSTate({
          loading: false
        });
        console.log(error);
      });
    }
  }, {
    key: "getOrdinalUnit",
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
      return "th";
    }
  }, {
    key: "getColorClass",
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
    key: "renderLeader",
    value: function renderLeader(leader, key) {
      var num = key + 1;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center flex-wrap",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "is-flex flex-v-center flex-wrap",
          children: [leader.thumbnail.src.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "item mr-1",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
              src: leader.thumbnail.src,
              alt: leader.thumbnail.alt,
              className: "item-thumbnail img-circle elevation-1",
              style: {
                marginTop: 8
              }
            })
          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
              children: leader.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "text-dark-muted",
              children: ["Submitted ", leader.observations_count, " observations"]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "hexagon ".concat(this.getColorClass(num)),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
            className: 'is-block has-text-centered',
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b", {
              children: num
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("small", {
              children: this.getOrdinalUnit(num)
            })]
          })
        })]
      }, key);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        children: [this.state.loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          className: "has-text-centered",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
            className: "fa fa-spinner fa-spin"
          })
        }) : null, this.state.leaders.map(this.renderLeader.bind(this))]
      });
    }
  }]);
  return Leaderboard;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

Leaderboard.propTypes = {
  limit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)
};
Leaderboard.defaultProps = {
  limit: 5
};

/***/ }),

/***/ "./resources/assets/js/components/Navbar.jsx":
/*!***************************************************!*\
  !*** ./resources/assets/js/components/Navbar.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navbar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_Path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/Path */ "./resources/assets/js/helpers/Path.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _helpers_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/User */ "./resources/assets/js/helpers/User.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Navbar = /*#__PURE__*/function (_Component) {
  _inherits(Navbar, _Component);
  function Navbar(props) {
    var _this;
    _classCallCheck(this, Navbar);
    _this = _callSuper(this, Navbar, [props]);
    _this.state = {
      isActive: false
    };
    return _this;
  }
  _createClass(Navbar, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        isActive: !this.state.isActive
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("nav", {
        className: "navbar".concat(this.props.home ? ' home-nav' : ''),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "".concat(!this.props.container ? 'container' : 'container is-fluid'),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "navbar-brand",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
              to: "/",
              className: "navbar-item",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
                src: "/logo/ts-logo-".concat(this.props.home ? '48' : '32', ".png"),
                alt: "Logo",
                className: "logo-img"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                className: "logo-text",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("b", {
                  children: "Tree"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                  style: {
                    fontWeight: 300
                  },
                  children: "Snap"
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "navbar-burger",
              onClick: this.toggle.bind(this),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {})]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "navbar-menu".concat(this.state.isActive ? ' is-active' : ''),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "navbar-end",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                exact: true,
                to: "/",
                className: "navbar-item",
                activeClassName: 'is-active',
                children: "Home"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                to: "/map",
                className: "navbar-item",
                activeClassName: 'is-active',
                children: "Map"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                to: "/partners",
                className: "navbar-item",
                activeClassName: 'is-active',
                children: "Scientific Partners"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                to: "/about",
                className: "navbar-item",
                activeClassName: 'is-active',
                children: "About"
              }), _helpers_User__WEBPACK_IMPORTED_MODULE_2__["default"].authenticated() ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "navbar-item",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                  className: "dropdown has-dropdown is-hoverable",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                    to: "/account",
                    className: "navbar-link dropdown-trigger",
                    activeClassName: 'is-active',
                    children: "Account"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                    className: "navbar-dropdown dropdown-menu",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                      to: "/account/observations",
                      className: "navbar-item",
                      activeClassName: 'is-active',
                      children: "My Observations"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                      to: "/account/groups",
                      className: "navbar-item",
                      activeClassName: 'is-active',
                      children: "Groups"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                      to: "/account/collections",
                      className: "navbar-item",
                      activeClassName: 'is-active',
                      children: "Collections"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                      to: "/account/filters",
                      className: "navbar-item",
                      activeClassName: 'is-active',
                      children: "Filters"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("hr", {
                      className: "navbar-divider"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink, {
                      to: "/account",
                      className: "navbar-item",
                      activeClassName: 'is-active',
                      children: "Settings"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                      href: "/logout",
                      className: "navbar-item",
                      children: "Logout"
                    })]
                  })]
                })
              }) : null, !_helpers_User__WEBPACK_IMPORTED_MODULE_2__["default"].authenticated() ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                href: "/login",
                className: "navbar-item ".concat(_helpers_Path__WEBPACK_IMPORTED_MODULE_1__["default"].isActive('/login')),
                children: "Login"
              }) : null, !_helpers_User__WEBPACK_IMPORTED_MODULE_2__["default"].authenticated() ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                href: "/register",
                className: "navbar-item ".concat(_helpers_Path__WEBPACK_IMPORTED_MODULE_1__["default"].isActive('/register')),
                children: "Register"
              }) : null, _helpers_User__WEBPACK_IMPORTED_MODULE_2__["default"].can('access admin pages') ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                href: "/admin",
                className: "navbar-item ".concat(_helpers_Path__WEBPACK_IMPORTED_MODULE_1__["default"].isActive('/admin', false)),
                children: "Admin"
              }) : null]
            })
          })]
        })
      });
    }
  }]);
  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

Navbar.propTypes = {
  container: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  home: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};
Navbar.defaultProps = {
  container: false,
  home: false
};

/***/ }),

/***/ "./resources/assets/js/components/ObservationsFeed.jsx":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/ObservationsFeed.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObservationsFeed)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ObservationsFeed = /*#__PURE__*/function (_Component) {
  _inherits(ObservationsFeed, _Component);
  function ObservationsFeed(props) {
    var _this;
    _classCallCheck(this, ObservationsFeed);
    _this = _callSuper(this, ObservationsFeed, [props]);
    _this.state = {
      observations: [],
      moreObservations: [],
      loading: true,
      page: 1,
      lastPage: 0,
      endOfFeed: false
    };
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.loadMoreObservations = _this.loadMoreObservations.bind(_assertThisInitialized(_this));
    _this.loadObservations = _this.loadObservations.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ObservationsFeed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadObservations();
    }
  }, {
    key: "loadObservations",
    value: function loadObservations() {
      var _this2 = this;
      axios.get("/web/observations/feed/", {
        params: {
          page: this.state.page
        }
      }).then(function (response) {
        // this.setState({observations: response.data.data, loading: false})
        _this2.setState({
          observations: response.data.data
        });
        _this2.setState({
          lastPage: response.data['last_page']
        });
        _this2.setState({
          loading: false
        });
      })["catch"](function (error) {
        console.log(error);
        _this2.setState({
          loading: false
        });
      });
    }
  }, {
    key: "loadMoreObservations",
    value: function loadMoreObservations(skip) {
      var _this3 = this;
      axios.get("/web/observations/feed/", {
        params: {
          page: this.state.page
        }
      }).then(function (response) {
        // this.setState({observations: response.data.data, loading: false})
        _this3.setState({
          observations: [].concat(_toConsumableArray(_this3.state.observations), _toConsumableArray(response.data.data))
        });
        _this3.setState({
          loading: false
        });
      })["catch"](function (error) {
        console.log(error);
        _this3.setState({
          loading: false
        });
      });
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      var _this4 = this;
      var bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
      if (bottom && this.state.loading == false) {
        if (this.state.page === this.state.lastPage + 1) {
          this.setState({
            endOfFeed: true
          });
        } else {
          this.setState({
            loading: true
          });
          this.setState({
            page: this.state.page + 1
          });
          var delayInMilliseconds = 1000;
          setTimeout(function () {
            _this4.loadMoreObservations();
          }, 1000);
        }
      }
    }
  }, {
    key: "renderObservation",
    value: function renderObservation(observation) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: 'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "is-flex flex-v-center flex-wrap",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "item mr-1",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
              to: "observation/".concat(observation.id),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                src: observation.thumbnail,
                alt: "".concat(observation.observation_category, " by ").concat(observation.user.name),
                className: "item-thumbnail img-circle elevation-1",
                style: {
                  marginTop: 8
                }
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
              to: "observation/".concat(observation.id),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
                children: observation.observation_category
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "text-dark-muted",
              children: ["Submitted by ", observation.user.name]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "text-dark-muted",
              children: observation.date
            })]
          })]
        })
      }, observation.id);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        style: {
          maxHeight: 487,
          overflowY: 'auto'
        },
        onScroll: this.handleScroll,
        children: [this.state.observations.map(this.renderObservation.bind(this)), this.state.observations.length === 0 && !this.state.loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          className: "text-dark-muted has-text-centered",
          children: "There are no observations at this time"
        }) : null, this.state.endOfFeed ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          className: "text-dark-muted has-text-centered",
          children: "End of Feed"
        }) : null, this.state.loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          className: "has-text-centered",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
            className: "fa fa-spinner fa-spin"
          })
        }) : null]
      });
    }
  }]);
  return ObservationsFeed;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/RecentUpdates.jsx":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/RecentUpdates.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecentUpdates)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var RecentUpdates = /*#__PURE__*/function (_Component) {
  _inherits(RecentUpdates, _Component);
  function RecentUpdates() {
    _classCallCheck(this, RecentUpdates);
    return _callSuper(this, RecentUpdates, arguments);
  }
  _createClass(RecentUpdates, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "recent-updates",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
            className: "title is-3 text-white has-text-centered",
            children: "Recent Updates"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "update-marquee",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "update-card",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
                children: "The Hemlock survey has been updated to support the Lingering Hemlock Protocol"
              })
            })
          })]
        })
      });
    }
  }]);
  return RecentUpdates;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/Treet.jsx":
/*!**************************************************!*\
  !*** ./resources/assets/js/components/Treet.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Treet)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Treet = /*#__PURE__*/function (_Component) {
  _inherits(Treet, _Component);
  function Treet(props) {
    var _this;
    _classCallCheck(this, Treet);
    _this = _callSuper(this, Treet, [props]);
    _this.state = {
      loading: true,
      isLoggedIn: false,
      isAdmin: false,
      isEditing: false,
      appNames: ['HealthyWoods', 'Eastern Forest Pests', 'Avid Deer', 'Treesnap', 'FlorestaDB'],
      appName: '',
      imagePath: _this.props.treet.image_path,
      description: _this.props.treet.description,
      currentAppName: _this.props.treet.app_name
    };
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.renderAppName = _this.renderAppName.bind(_assertThisInitialized(_this));
    _this.handleChangeAppName = _this.handleChangeAppName.bind(_assertThisInitialized(_this));
    _this.handleChangeDescription = _this.handleChangeDescription.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Treet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      axios.get('/web/user/status').then(function (response) {
        var data = response.data.data;
        _this2.setState({
          isLoggedIn: data.logged_in
        });
        if (data.is_admin) {
          _this2.setState({
            isAdmin: data.is_admin
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      this.props.editTreet(this.props.treet.id, event.target.appName.value, this.state.imagePath, event.target.description.value);
      this.toggle();
    }
  }, {
    key: "handleChangeAppName",
    value: function handleChangeAppName(event) {
      this.setState({
        appName: event.target.value
      });
      if (event.target.value == "Treesnap") {
        this.setState({
          imagePath: "../images/logos/treesnap_logo.png"
        });
      } else if (event.target.value == "FlorestaDB") {
        this.setState({
          imagePath: "../images/logos/florestadb_logo.png"
        });
      } else if (event.target.value == "HealthyWoods") {
        this.setState({
          imagePath: "../images/logos/healthywoods_logo.png"
        });
      } else if (event.target.value == "Avid Deer") {
        this.setState({
          imagePath: "../images/logos/aviddeer_logo.png"
        });
      } else if (event.target.value == "Eastern Forest Pests") {
        this.setState({
          imagePath: "../images/logos/efp_logo.png"
        });
      }
    }
  }, {
    key: "handleChangeDescription",
    value: function handleChangeDescription(event) {
      this.setState({
        description: event.target.value
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.setState(function (prevState) {
        return {
          isEditing: !prevState.isEditing
        };
      });
    }
  }, {
    key: "renderAppName",
    value: function renderAppName(appName) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
        className: "pa-2",
        value: appName,
        children: appName
      }, appName);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var treet = this.props.treet;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: 'item-box elevation-1 is-lighter-dark is-flex flex-space-between flex-v-center',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "is-flex flex-v-center flex-column-left flex-wrap w-100",
          children: this.state.isEditing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("form", {
              className: "w-100",
              onSubmit: this.onSubmit,
              id: "edit-form",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: 'item-box',
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "recent-updates-form",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "field",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                      htmlFor: "appName",
                      className: "label text-white",
                      children: "App Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                      className: "control ",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                        className: "select w-100",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("select", {
                          type: "select",
                          name: "appName",
                          className: "w-100",
                          id: "appName-dropdown",
                          defaultValue: treet.app_name,
                          onChange: this.handleChangeAppName,
                          children: this.state.appNames.map(function (appName) {
                            return _this3.renderAppName(appName);
                          })
                        })
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "field mt-1 mb-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                      className: "label text-white",
                      children: "Description"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                      className: "control",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("textarea", {
                        className: "input textarea-height-8em",
                        name: "description",
                        defaultValue: treet.description,
                        onChange: this.handleChangeDescription
                      })
                    })]
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "edit",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                className: "button is-primary is-small mr-3",
                type: "submit",
                form: "edit-form",
                children: "Submit"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                className: "button is-danger is-small mr-3",
                onClick: function onClick() {
                  return _this3.toggle();
                },
                children: "Cancel"
              })]
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "flex-row flex-space-between w-100",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                className: "flex-row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                  className: "item mr-2",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
                    href: treet.url,
                    target: "_blank",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                      src: treet.image_path,
                      alt: treet.app_name,
                      className: "item-thumbnail "
                    })
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                  className: "item",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    className: "text-dark-muted text-wrap",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
                      children: treet.app_name
                    })
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "item",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                  className: "text-dark-muted text-wrap",
                  children: treet.date
                })
              })]
            }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "item",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "text-dark-muted text-wrap w-100",
                children: treet.description
              })
            }), this.state.isLoggedIn && this.state.isAdmin ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "edit",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                className: "button is-primary is-small mr-3",
                onClick: function onClick() {
                  return _this3.toggle();
                },
                children: "Edit"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                className: "button is-danger is-small",
                onClick: function onClick() {
                  return _this3.props.deleteTreet(treet);
                },
                children: "Delete"
              })]
            }) : null]
          })
        })
      });
    }
  }]);
  return Treet;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/components/TwitterFeed.jsx":
/*!********************************************************!*\
  !*** ./resources/assets/js/components/TwitterFeed.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TwitterFeed)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Treet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Treet */ "./resources/assets/js/components/Treet.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var TwitterFeed = /*#__PURE__*/function (_Component) {
  _inherits(TwitterFeed, _Component);
  function TwitterFeed(props) {
    var _this;
    _classCallCheck(this, TwitterFeed);
    _this = _callSuper(this, TwitterFeed, [props]);
    _this.state = {
      isEditing: false,
      isLoggedIn: false,
      isAdmin: false,
      appNames: ['Eastern Forest Pests', 'HealthyWoods', 'Avid Deer', 'Treesnap', 'FlorestaDB'],
      appName: '',
      imagePath: '',
      description: '',
      treets: [],
      isOpen: false
    };
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.editTreet = _this.editTreet.bind(_assertThisInitialized(_this));
    _this.handleChangeAppName = _this.handleChangeAppName.bind(_assertThisInitialized(_this));
    _this.handleChangeDescription = _this.handleChangeDescription.bind(_assertThisInitialized(_this));
    _this.deleteTreet = _this.deleteTreet.bind(_assertThisInitialized(_this));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(TwitterFeed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      axios.get('/web/user/status').then(function (response) {
        var data = response.data.data;
        _this2.setState({
          isLoggedIn: data.logged_in
        });
        if (data.is_admin) {
          _this2.setState({
            isAdmin: data.is_admin
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
      this.loadTreets();
      setInterval(this.loadTreets.bind(this), 120000);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    }
  }, {
    key: "loadTreets",
    value: function loadTreets() {
      var _this3 = this;
      axios.get("/web/treets/feed").then(function (response) {
        _this3.setState({
          treets: response.data.data,
          loading: false
        });
      })["catch"](function (error) {
        console.log(error);
        _this3.setState({
          loading: false
        });
      });
    }
  }, {
    key: "deleteTreet",
    value: function deleteTreet(treet) {
      var _this4 = this;
      axios["delete"]("/web/treet/".concat(treet.id)).then(function (response) {
        _this4.loadTreets();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "editTreet",
    value: function editTreet(id, appName, imagePath, description) {
      var _this5 = this;
      axios.put("/web/treets/update/".concat(id), {
        app_name: appName,
        image_path: imagePath,
        description: description
      }).then(function (response) {
        _this5.loadTreets();
      })["catch"](function (error) {
        if (error.response) {
          console.log(error);
        }
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var _this6 = this;
      event.preventDefault();
      axios.post('/web/treets/create', {
        app_name: event.target.appName.value,
        image_path: this.state.imagePath,
        description: event.target.description.value
      }).then(function (response) {
        _this6.loadTreets();
        _this6.toggle();
        _this6.setState({
          appName: ''
        });
        _this6.setState({
          description: ''
        });
        cosnole.log(response.data);
      })["catch"](function (error) {
        if (error.response) {
          console.log(error);
        }
      });
    }
  }, {
    key: "handleChangeAppName",
    value: function handleChangeAppName(event) {
      this.setState({
        appName: event.target.value
      });
      if (event.target.value == "Treesnap") {
        this.setState({
          imagePath: "../images/logos/treesnap_logo.png"
        });
      } else if (event.target.value == "FlorestaDB") {
        this.setState({
          imagePath: "../images/logos/florestadb_logo.png"
        });
      } else if (event.target.value == "HealthyWoods") {
        this.setState({
          imagePath: "../images/logos/healthywoods_logo.png"
        });
      } else if (event.target.value == "Avid Deer") {
        this.setState({
          imagePath: "../images/logos/aviddeer_logo.png"
        });
      } else if (event.target.value == "Eastern Forest Pests") {
        this.setState({
          imagePath: "../images/logos/efp_logo.png"
        });
      }
    }
  }, {
    key: "handleChangeDescription",
    value: function handleChangeDescription(event) {
      this.setState({
        description: event.target.value
      });
    }
  }, {
    key: "renderButton",
    value: function renderButton(isOpen) {
      var button;
      if (isOpen) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
          type: "button",
          onClick: this.toggle,
          className: "button mb-1 w-100 is-primary",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
            className: "fa fa-minus"
          }), " \xA0  Close "]
        });
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
        type: "button",
        onClick: this.toggle,
        className: "button mb-1 w-100 is-primary",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
          className: "fa fa-plus"
        }), " \xA0  New Update "]
      });
    }
  }, {
    key: "renderAppName",
    value: function renderAppName(appName) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
        className: "pa-2",
        value: appName,
        children: appName
      }, appName);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;
      var treetList = this.state.treets.map(function (treet) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Treet__WEBPACK_IMPORTED_MODULE_1__["default"], {
          deleteTreet: _this7.deleteTreet,
          editTreet: _this7.editTreet,
          loadTreets: _this7.loadTreets,
          treet: treet
        }, treet.id);
      });
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        children: [this.state.isLoggedIn && this.state.isAdmin ? this.renderButton(this.state.isOpen) : null, this.state.isOpen ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("form", {
          className: "",
          id: "create-form",
          onSubmit: this.onSubmit,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: 'item-box elevation-1 is-lighter-light',
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "recent-updates-form",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "field",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                  htmlFor: "appName",
                  className: "label text-white",
                  children: "App Name"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  className: "control ",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                    className: "select w-100",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("select", {
                      type: "select",
                      name: "appName",
                      className: "w-100",
                      id: "appName-dropdown",
                      onChange: this.handleChangeAppName,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
                        value: "",
                        children: "Select App"
                      }), this.state.appNames.map(this.renderAppName.bind(this))]
                    })
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "field mt-1 mb-2",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                  className: "label text-white",
                  children: "Description"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  className: "control",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("textarea", {
                    className: "input textarea-height-8em",
                    name: "description",
                    cols: "3",
                    value: this.state.description,
                    onChange: this.handleChangeDescription,
                    placeholder: 'Description'
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
                type: "submit",
                form: "create-form",
                className: "button",
                children: "Submit"
              })]
            })
          })
        }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          style: {
            maxHeight: 487,
            overflowY: 'auto'
          },
          className: 'invisible-scrollbar',
          children: [this.state.loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "has-text-centered",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
              className: "fa fa-spinner fa-spin"
            })
          }) : null, treetList, this.state.treets.length === 0 && !this.state.loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-dark-muted has-text-centered",
            children: "There are no treets at this time"
          }) : null]
        })]
      });
    }
  }]);
  return TwitterFeed;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/helpers/EventEmitter.js":
/*!*****************************************************!*\
  !*** ./resources/assets/js/helpers/EventEmitter.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
  }
  _createClass(EventEmitter, [{
    key: "emit",
    value: function emit(type) {
      var event;
      if (document.createEvent) {
        event = new Event(type);
        document.dispatchEvent(event);
      } else {
        event = document.createEventObject();
        document.fireEvent('on' + type, event);
      }
    }
  }, {
    key: "listen",
    value: function listen(type, callback) {
      document.addEventListener(type, callback);
    }
  }, {
    key: "remove",
    value: function remove(type, callback) {
      document.removeEventListener(type, callback);
    }
  }]);
  return EventEmitter;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EventEmitter());

/***/ }),

/***/ "./resources/assets/js/helpers/Path.js":
/*!*********************************************!*\
  !*** ./resources/assets/js/helpers/Path.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Path = /*#__PURE__*/function () {
  function Path() {
    _classCallCheck(this, Path);
    this.setPath();
  }
  _createClass(Path, [{
    key: "setPath",
    value: function setPath() {
      this.path = window.location.pathname;
      if (this.path !== '/') {
        this.path.replace(/\/$/g, '');
      }
    }
  }, {
    key: "isActive",
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
    key: "parseUrl",
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Path());

/***/ }),

/***/ "./resources/assets/js/helpers/User.js":
/*!*********************************************!*\
  !*** ./resources/assets/js/helpers/User.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./resources/assets/js/helpers/EventEmitter.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var User = /*#__PURE__*/function () {
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
    _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].listen('user.groups.updated', this.loadGroups.bind(this));
  }

  /**
   * Initialize abilities.
   */
  _createClass(User, [{
    key: "initAbilities",
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
    key: "loadGroups",
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
      })["catch"](function (error) {
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
    key: "can",
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
    key: "owns",
    value: function owns(object, foreign_key) {
      if (typeof foreign_key === 'undefined') {
        foreign_key = 'user_id';
      }
      if (_typeof(object) === 'object') {
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
    key: "inGroupWith",
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
    key: "inGroup",
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
    key: "authenticated",
    value: function authenticated() {
      return this._isLoggedIn;
    }

    /**
     * Checks if the user has admin role.
     *
     * @returns {boolean}
     */
  }, {
    key: "admin",
    value: function admin() {
      return this._isAdmin;
    }

    /**
     * Checks if user has scientist role.
     *
     * @returns {boolean}
     */
  }, {
    key: "scientist",
    value: function scientist() {
      return this._isScientist;
    }

    /**
     * Gets the role.
     *
     * @returns {String|Null}
     */
  }, {
    key: "role",
    value: function role() {
      return this._role;
    }

    /**
     * Get the authenticated user record.
     *
     * @returns {Object|Boolean}
     */
  }, {
    key: "user",
    value: function user() {
      return this._user;
    }
  }]);
  return User;
}(); // Use JSON to deep copy the object without keeping any references
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new User());

/***/ }),

/***/ "./resources/assets/js/scenes/Scene.jsx":
/*!**********************************************!*\
  !*** ./resources/assets/js/scenes/Scene.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scene)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scene = /*#__PURE__*/function (_Component) {
  _inherits(Scene, _Component);
  function Scene(props) {
    var _this;
    _classCallCheck(this, Scene);
    _this = _callSuper(this, Scene, [props]);
    if (window.ga) {
      setTimeout(function () {
        return window.ga('send', 'pageview');
      }, 2500);
    }
    return _this;
  }
  return _createClass(Scene);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


/***/ }),

/***/ "./resources/assets/js/scenes/WelcomeScene.jsx":
/*!*****************************************************!*\
  !*** ./resources/assets/js/scenes/WelcomeScene.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Welcome)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Navbar */ "./resources/assets/js/components/Navbar.jsx");
/* harmony import */ var _components_HomeJumbotron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/HomeJumbotron */ "./resources/assets/js/components/HomeJumbotron.jsx");
/* harmony import */ var _components_FeaturesList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FeaturesList */ "./resources/assets/js/components/FeaturesList.jsx");
/* harmony import */ var _components_RecentUpdates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/RecentUpdates */ "./resources/assets/js/components/RecentUpdates.jsx");
/* harmony import */ var _components_HomeFooter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/HomeFooter */ "./resources/assets/js/components/HomeFooter.jsx");
/* harmony import */ var _components_Leaderboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Leaderboard */ "./resources/assets/js/components/Leaderboard.jsx");
/* harmony import */ var _components_TwitterFeed__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/TwitterFeed */ "./resources/assets/js/components/TwitterFeed.jsx");
/* harmony import */ var _components_ObservationsFeed__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ObservationsFeed */ "./resources/assets/js/components/ObservationsFeed.jsx");
/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Scene */ "./resources/assets/js/scenes/Scene.jsx");
/* harmony import */ var _components_Dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Dropdown */ "./resources/assets/js/components/Dropdown.jsx");
/* harmony import */ var _helpers_User__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers/User */ "./resources/assets/js/helpers/User.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }














var Welcome = /*#__PURE__*/function (_Scene) {
  _inherits(Welcome, _Scene);
  function Welcome(props) {
    var _this;
    _classCallCheck(this, Welcome);
    _this = _callSuper(this, Welcome, [props]);
    _this.state = {
      isLoggedIn: false,
      loading: true
    };
    document.title = 'TreeSnap - Help Our Nation\'s Trees!';
    return _this;
  }
  _createClass(Welcome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      axios.get('/web/user/status').then(function (response) {
        var data = response.data.data;
        _this2.setState({
          isLoggedIn: data.logged_in
        });
      })["catch"](function (error) {
        console.log(error);
      });
    }

    /**
     * Render the scene.
     *
     * @returns {XML}
     */
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
          className: "home",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], {
            home: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_HomeJumbotron__WEBPACK_IMPORTED_MODULE_2__["default"], {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
          className: "home-section bg-dark",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "container",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
              className: "columns",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "column",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h3", {
                  className: 'title is-3 bg-dark has-text-centered mb-none',
                  children: "Leaderboard"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("p", {
                  className: "has-text-centered text-dark-muted mb-0",
                  children: "Top Submitters of All Time"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Leaderboard__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  limit: 5
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "column",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h3", {
                  className: 'title is-3 bg-dark has-text-centered mb-none',
                  children: "Observation Feed"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("p", {
                  className: "has-text-centered text-dark-muted mb-0",
                  children: "Latest Observations"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_ObservationsFeed__WEBPACK_IMPORTED_MODULE_8__["default"], {})]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "column",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                  className: "update-row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h3", {
                    className: 'title is-3 bg-dark has-text-centered mr-3 mb-none',
                    children: "Recent Updates"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("p", {
                  className: "has-text-centered text-dark-muted mb-0",
                  children: ["Latest Updates from ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
                    target: "_blank",
                    href: "https://staton-lab-portfolio.web.app/",
                    children: "Staton Lab"
                  }), " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_TwitterFeed__WEBPACK_IMPORTED_MODULE_7__["default"], {})]
              })]
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_FeaturesList__WEBPACK_IMPORTED_MODULE_3__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_HomeFooter__WEBPACK_IMPORTED_MODULE_5__["default"], {})]
      });
    }
  }]);
  return Welcome;
}(_Scene__WEBPACK_IMPORTED_MODULE_9__["default"]);


/***/ })

}]);