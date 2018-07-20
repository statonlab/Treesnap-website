webpackJsonp([26],{

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ObservationsByStateTable__ = __webpack_require__(521);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ObservationsByStateScene = function (_Component) {
  _inherits(ObservationsByStateScene, _Component);

  function ObservationsByStateScene() {
    _classCallCheck(this, ObservationsByStateScene);

    return _possibleConstructorReturn(this, (ObservationsByStateScene.__proto__ || Object.getPrototypeOf(ObservationsByStateScene)).apply(this, arguments));
  }

  _createClass(ObservationsByStateScene, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          { className: 'title is-3' },
          'Observations By State'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_ObservationsByStateTable__["a" /* default */], { limit: 100 })
        )
      );
    }
  }]);

  return ObservationsByStateScene;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ObservationsByStateScene);

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

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Spinner__ = __webpack_require__(426);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ObservationsByStateTable = function (_Component) {
  _inherits(ObservationsByStateTable, _Component);

  function ObservationsByStateTable(props) {
    _classCallCheck(this, ObservationsByStateTable);

    var _this = _possibleConstructorReturn(this, (ObservationsByStateTable.__proto__ || Object.getPrototypeOf(ObservationsByStateTable)).call(this, props));

    _this.state = {
      rows: {},
      loading: true
    };
    return _this;
  }

  _createClass(ObservationsByStateTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var limit = this.props.limit || null;
      axios.get('/admin/web/analytics/observations/states/' + limit).then(function (response) {
        var rows = response.data.data;
        _this2.setState({
          rows: rows,
          loading: false
        });
      }).catch(function (error) {
        _this2.setState({ loading: false });
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var rows = this.state.rows;

      var keys = Object.keys(rows);

      if (this.state.loading) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Spinner__["a" /* default */], { visible: this.state.loading, inline: true });
      }

      if (keys.length === 0) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          null,
          'No results found'
        );
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
              'State'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              { className: 'has-text-right' },
              'Number of Observations Reported'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          keys.map(function (key) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              { key: key },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                key
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                { className: 'has-text-right' },
                rows[key]
              )
            );
          })
        )
      );
    }
  }]);

  return ObservationsByStateTable;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (ObservationsByStateTable);


ObservationsByStateTable.propTypes = {
  limit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

ObservationsByStateTable.defaultProps = {
  limit: 10
};

/***/ })

});