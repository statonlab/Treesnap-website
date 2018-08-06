webpackJsonp([4],{

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

/***/ 212:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dragscroll__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dragscroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dragscroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Sidebar__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Navbar__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Copyright__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Map__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Marker__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Modal__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_image_gallery__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_image_gallery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_image_gallery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Spinner__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Disclaimer__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__helpers_MarkersFilter__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__helpers_Labels__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_AdvancedFiltersModal__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_router_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_Notify__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_CollectionForm__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_FlagForm__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__helpers_Utils__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__helpers_User__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__helpers_Path__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Scene__ = __webpack_require__(270);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
























var App = function (_Scene) {
  _inherits(App, _Scene);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.initPosition();

    _this.initialLoad = true;

    _this.state = {
      markers: [],
      categories: [],
      selectedCategories: [],
      selectedConfirmation: 0,
      center: _this.defaultMapPosition.center,
      zoom: _this.defaultMapPosition.zoom,
      selectedMarker: null,
      galleryImages: [],
      showSidebar: false,
      loading: false,
      showFilters: false,
      searchTerm: '',
      collections: [],
      selectedCollection: 0,
      filters: [],
      selectedFilter: 0,
      showFiltersModal: false,
      total: 0,
      showCollectionsForm: false,
      showFlagForm: false,
      ownedCollections: [],
      appliedAdvancedFilter: false
    };

    document.title = 'Map - TreeSnap';
    return _this;
  }

  /**
   * Set the maps and load observations into the state.
   */


  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadCategories();
      this.loadCollections();
      this.loadFilters();
      this.loadCount();
      document.body.className = 'map-page';
    }

    /**
     * Set loading state and inititate the sidebar
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ loading: true });
      this.initSidebar();
    }

    /**
     *
     */

  }, {
    key: 'initPosition',
    value: function initPosition() {
      this.defaultMapPosition = {
        center: {
          lat: 40.354388,
          lng: -95.998237
        },
        zoom: 5
      };

      try {
        var parsed = __WEBPACK_IMPORTED_MODULE_20__helpers_Path__["a" /* default */].parseUrl(this.props.location.search);

        if (typeof parsed.zoom !== 'undefined') {
          var zoom = parseInt(parsed.zoom);
          if (!isNaN(zoom) && zoom > 1 && zoom < 16) {
            this.defaultMapPosition.zoom = zoom;
          }
        }

        if (typeof parsed.center !== 'undefined') {
          var center = parsed.center.split(',');
          if (center.length === 2) {
            var lat = parseFloat(center[0]);
            var lng = parseFloat(center[1]);
            if (!isNaN(lat) && !isNaN(lng)) {
              this.defaultMapPosition.center = { lat: lat, lng: lng };
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Revert body classes
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.className = '';
    }

    /**
     *
     */

  }, {
    key: 'loadCount',
    value: function loadCount() {
      var _this2 = this;

      axios.get('/web/map/count').then(function (response) {
        _this2.setState({
          total: response.data.data.count
        });
      }).catch(function (error) {
        console.log(error.response);
      });
    }

    /**
     * Open the sidebar automatically and display the filters if the window
     * is big enough (bigger than 797px which is the popular tablet width)
     */

  }, {
    key: 'initSidebar',
    value: function initSidebar() {
      if (window.outerWidth > 797) {
        this.setState({
          showSidebar: true,
          showFilters: true
        });
        this.refs.maps.resize();
      }
    }

    /**
     * Open the sidebar and reset the map size.
     */

  }, {
    key: 'openSidebar',
    value: function openSidebar() {
      this.setState({
        showSidebar: true
      });
      this.refs.maps.resize();
    }

    /**
     * Close the sidebar and reset the map size.
     */

  }, {
    key: 'closeSidebar',
    value: function closeSidebar() {
      this.setState({
        showSidebar: false,
        showCollectionsForm: false,
        showFlagForm: false
      });
      this.refs.maps.resize();
    }
  }, {
    key: 'updateHistory',
    value: function updateHistory(center, zoom) {
      var lat = void 0,
          lng = void 0;
      if (typeof center.lat === 'function') {
        lat = center.lat();
      } else {
        lat = center.lat;
      }

      if (typeof center.lng === 'function') {
        lng = center.lng();
      } else {
        lng = center.lng;
      }

      this.props.history.replace('/map/?center=' + lat + ',' + lng + '&zoom=' + zoom);
    }

    /**
     * Gets observations from the API and parses them into markers.
     */

  }, {
    key: 'loadObservations',
    value: function loadObservations() {
      var _this3 = this;

      var bounds = this.refs.maps.getBounds();

      axios.get('/web/map', {
        params: {
          bounds: {
            southWest: bounds.getSouthWest().toJSON(),
            northEast: bounds.getNorthEast().toJSON()
          }
        }
      }).then(function (response) {
        _this3.initialLoad = false;

        // Setup the observations to be rendered into markers
        var markers = response.data.data;

        // Add the markers to the state
        if (!__WEBPACK_IMPORTED_MODULE_19__helpers_User__["a" /* default */].admin() && !__WEBPACK_IMPORTED_MODULE_19__helpers_User__["a" /* default */].scientist()) {
          _this3.disclaimer.show();
        }

        var filtered = void 0;
        if (!_this3.filter) {
          _this3.filter = new __WEBPACK_IMPORTED_MODULE_11__helpers_MarkersFilter__["a" /* default */](markers, _this3.state.selectedCategories);
          filtered = _this3.filter._filter();
        } else {
          _this3.filter.resetBounds();
          filtered = _this3.filter.replace(markers);
        }

        _this3.setState({ markers: filtered, loading: false });
      }).catch(function (error) {
        _this3.setState({ loading: false });
        console.log(error);
      });
    }

    /**
     * Get available categories from the server.
     */

  }, {
    key: 'loadCategories',
    value: function loadCategories() {
      var _this4 = this;

      axios.get('/web/observations/categories').then(function (response) {
        var categories = response.data.data;
        _this4.setState({
          categories: categories,
          selectedCategories: categories
        });

        if (_this4.filter) {
          _this4.filter.setCategories(categories);
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    }

    /**
     * Get available collections from the server.
     * Logged in users only.
     */

  }, {
    key: 'loadCollections',
    value: function loadCollections() {
      var _this5 = this;

      if (!__WEBPACK_IMPORTED_MODULE_19__helpers_User__["a" /* default */].authenticated()) {
        return;
      }

      axios.get('/web/collections/1').then(function (response) {
        _this5.setState({ collections: response.data.data });
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          // Ignore unauthenticated error
          return;
        }

        console.log(error.response);
      });

      axios.get('/web/collections/customizable/1').then(function (response) {
        _this5.setState({ ownedCollections: response.data.data });
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          // Ignore unauthenticated error
          return;
        }

        console.log(error.response);
      });
    }

    /**
     * Get available filters from the server.
     * Logged in users only.
     */

  }, {
    key: 'loadFilters',
    value: function loadFilters() {
      var _this6 = this;

      if (!__WEBPACK_IMPORTED_MODULE_19__helpers_User__["a" /* default */].authenticated()) {
        return;
      }

      axios.get('/web/filters').then(function (response) {
        var filters = response.data.data.map(function (filter) {
          return {
            label: filter.name,
            value: filter.id
          };
        });

        _this6.setState({ filters: filters });
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          // Ignore unauthenticated error
          return;
        }

        console.log(error.response);
      });
    }

    /**
     * Zoom to marker.
     *
     * @param marker
     * @param zoom
     */

  }, {
    key: 'goToSubmission',
    value: function goToSubmission(marker, zoom) {
      if (typeof zoom === 'undefined') {
        zoom = 15;
      }

      var center = {
        lat: marker.position.latitude,
        lng: marker.position.longitude
      };

      this.refs.maps.goTo(new google.maps.LatLng(center), zoom);

      this.updateHistory(center, zoom);
    }

    /**
     * Render individual submission.
     *
     * @param marker
     * @returns {XML}
     */

  }, {
    key: '_renderSubmission',
    value: function _renderSubmission(marker) {
      var _this7 = this;

      var title = marker.title;
      if (title.length > 30) {
        title = title.substr(0, 30) + '...';
      }
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'a',
        { href: 'javascript:;',
          role: 'button',
          className: 'bar-item',
          style: { backgroundImage: 'url(' + marker.thumbnail + ')' },
          key: 'marker_' + marker.id,
          onClick: function onClick() {
            _this7.setState({
              selectedMarker: marker,
              showFilters: false
            });
            _this7.openSidebar();
            var zoom = _this7.refs.maps.getZoom();
            _this7.goToSubmission(marker, zoom > 10 ? zoom : 13);
            if (marker.ref !== null) {
              marker.ref.openCallout();
            }
          } },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'bar-item-field' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'strong',
            { style: { color: '#fff' } },
            title
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'p',
            { style: { color: '#eee', fontWeight: '500', fontSize: '14px' } },
            marker.owner
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'p',
            { style: { color: '#eee', fontWeight: '500', fontSize: '14px' } },
            marker.date
          )
        )
      );
    }

    /**
     * Reset the position to the center and zoom out.
     */

  }, {
    key: 'resetMapPosition',
    value: function resetMapPosition() {
      this.refs.maps.goTo(this.defaultMapPosition.center, this.defaultMapPosition.zoom);
    }

    /**
     * Allow users to filter submissions by plant.
     *
     * @param name
     */

  }, {
    key: 'changeCategory',
    value: function changeCategory(name) {
      var selectedCategories = this.state.categories;
      if (name !== 'all') {
        selectedCategories = [name];
      }

      var markers = this.filter.category(selectedCategories);
      this.setState({ markers: markers, selectedCategories: selectedCategories });
    }

    /**
     * Allows users to filter by collection.
     *
     * @param selectedCollection
     */

  }, {
    key: 'changeCollection',
    value: function changeCollection(selectedCollection) {
      var markers = this.filter.collections(selectedCollection);
      this.setState({ markers: markers, selectedCollection: selectedCollection });
    }

    /**
     * Allows users to view only confirmed observations.
     *
     * @param selectedConfirmation
     */

  }, {
    key: 'changeConfirmation',
    value: function changeConfirmation(selectedConfirmation) {
      selectedConfirmation = parseInt(selectedConfirmation);
      var markers = this.filter.confirmed(selectedConfirmation);

      this.setState({ markers: markers, selectedConfirmation: selectedConfirmation });
    }

    /**
     * Allows users to reapply a saved advanced filter.
     *
     * @param selectedFilter
     */

  }, {
    key: 'changeFilter',
    value: function changeFilter(selectedFilter) {
      selectedFilter = parseInt(selectedFilter);
      this.setState({ selectedFilter: selectedFilter });
      if (selectedFilter !== 0) {
        this.applyAdvancedFilter(selectedFilter);
      } else {
        this.loadObservations();
        __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Advanced filters removed.');
      }
    }

    /**
     * Request filtered observations from server.
     *
     * @param selectedFilter
     */

  }, {
    key: 'applyAdvancedFilter',
    value: function applyAdvancedFilter(selectedFilter) {
      var _this8 = this;

      this.setState({ loading: true });
      axios.get('/web/filter/' + selectedFilter, {
        params: {
          map: 1
        }
      }).then(function (response) {
        var _response$data$data = response.data.data,
            observations = _response$data$data.observations,
            filter = _response$data$data.filter;

        var markers = _this8.filter.replace(observations);
        _this8.setState({
          markers: markers,
          loading: false,
          total: observations.length
        });
        if (filter) {
          __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Filter "' + filter.name + '" has been applied.');
        }
      }).catch(function (error) {
        _this8.setState({ loading: false });
        console.log(error);
      });
    }

    /**
     * Deal with newly created advanced filters.
     *
     * @param response
     */

  }, {
    key: 'filterCreated',
    value: function filterCreated(response) {
      var data = response.data;
      if (data.filter) {
        var filters = this.state.filters.concat({
          label: data.filter.name,
          value: data.filter.id
        });
        var selectedFilter = data.filter.id;

        this.setState({
          filters: filters,
          selectedFilter: selectedFilter
        });

        __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Filter "' + data.filter.name + '" has been created and applied.');
      } else {
        this.setState({ selectedFilter: 0 });
        __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Advanced filters applied.');
      }

      var markers = this.filter.replace(data.observations);
      this.setState({ markers: markers, showFiltersModal: false, appliedAdvancedFilter: true });
    }

    /**
     * search by plant name or username.
     *
     * @param searchTerm
     */

  }, {
    key: 'search',
    value: function search(searchTerm) {
      var markers = this.filter.search(searchTerm);
      this.setState({ markers: markers, searchTerm: searchTerm });
    }

    /**
     * Handle map bounds changes.
     *
     * @param newBounds
     */

  }, {
    key: 'boundsChanged',
    value: function boundsChanged(newBounds) {
      var center = this.refs.maps.getCenter();
      var zoom = this.refs.maps.getZoom();

      this.updateHistory(center, zoom);

      // Determine if the initial loader completed then respond to bounds change
      // If the initial loader is done, this.initialLoad is set to FALSE
      if (!this.initialLoad) {
        // Determine if there is an applied advanced filter
        if (parseInt(this.state.selectedFilter) === 0 && !this.state.appliedAdvancedFilter) {
          // No filters applied, so load observations with new bounds
          this.loadObservations();
          return;
        }
      }

      if (this.filter) {
        var markers = this.filter.bounds(newBounds);
        this.setState({ markers: markers });
      }
    }

    /**
     * Render the map.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderMap',
    value: function _renderMap() {
      var _this9 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5__components_Map__["a" /* default */],
        { id: 'map2',
          ref: 'maps',
          center: this.state.center,
          zoom: this.state.zoom,
          onBoundsChange: this.boundsChanged.bind(this),
          onLoad: this.loadObservations.bind(this)
        },
        this.state.markers.map(function (marker) {
          return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__components_Marker__["a" /* default */],
            { key: marker.id,
              position: marker.position,
              title: marker.title,
              ref: function ref(_ref) {
                return marker.ref = _ref;
              },
              owner_id: marker.user_id,
              onClick: function onClick() {
                _this9.setState({
                  selectedMarker: marker,
                  showFilters: false,
                  showCollectionsForm: false,
                  showFlagForm: false
                });

                if (window.innerWidth > 797) {
                  _this9.openSidebar();
                }
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              { className: 'media callout is-flex flex-v-center' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'div',
                { className: 'media-left mr-0' },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { src: marker.thumbnail,
                  alt: marker.title,
                  style: {
                    width: 50,
                    height: 'auto'
                  } })
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'div',
                { className: 'media-content' },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'div',
                  { className: 'mb-0' },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'strong',
                    null,
                    marker.title
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'div',
                  { className: 'mb-0' },
                  'By ',
                  marker.owner
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'a',
                  { href: '/observation/' + marker.id },
                  'See full description'
                )
              )
            )
          );
        })
      );
    }

    /**
     * Render bottom horizontal bar.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderBottomBar',
    value: function _renderBottomBar() {
      var _this10 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'horizontal-bar', id: 'horizontal-bar-container' },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'a',
          { href: 'javascript:;', className: 'scroll scroll-left', onClick: this.scrollLeft.bind(this) },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-chevron-left' })
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'bar-items-container dragscroll',
            id: 'horizontal-bar',
            style: { overflowX: this.state.markers.length === 0 ? 'hidden' : 'scroll' },
            onScroll: this.setScrollState.bind(this) },
          this.state.markers.slice(0, 20).map(function (marker, index) {
            return _this10._renderSubmission(marker, index);
          }),
          this.state.markers.length === 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'p',
            { className: 'ml-1 mt-1 has-text-white' },
            'No results found. Try zooming out or moving the map to cover the locations you are interested in.'
          ) : null
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'a',
          { href: 'javascript:;', className: 'scroll scroll-right', onClick: this.scrollRight.bind(this) },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-chevron-right' })
        )
      );
    }

    /**
     * Set the scroll bar position for the horizontal bar.
     */

  }, {
    key: 'setScrollState',
    value: function setScrollState() {
      var bar = document.getElementById('horizontal-bar');
      var container = document.getElementById('horizontal-bar-container');
      var width = bar.offsetWidth;
      var scrollPosition = bar.scrollLeft;

      if (width + scrollPosition === bar.scrollWidth) {
        container.style.paddingRight = '65px';
        bar.scrollLeft += 65;
      } else {
        container.style.paddingRight = 0;
      }
    }

    /**
     * Scroll the horizontal bar to the right
     */

  }, {
    key: 'scrollRight',
    value: function scrollRight() {
      var scrolled = 0;
      var interval = void 0;
      var scroll = function scroll() {
        if (scrolled === 200) {
          clearInterval(interval);
        }
        scrolled += 5;
        document.getElementById('horizontal-bar').scrollLeft += 5;
      };

      interval = setInterval(scroll, 5);
    }

    /**
     * Scroll the horizontal bar to the left
     */

  }, {
    key: 'scrollLeft',
    value: function scrollLeft() {
      var scrolled = 0;
      var interval = void 0;
      var scroll = function scroll() {
        if (scrolled === 200) {
          clearInterval(interval);
        }
        scrolled += 5;
        document.getElementById('horizontal-bar').scrollLeft -= 5;
      };

      interval = setInterval(scroll, 5);
    }

    /**
     * Render sidebar filters.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderFilters',
    value: function _renderFilters() {
      var _this11 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'sidebar-filters' },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'p',
          { className: 'mb-0', style: { marginTop: -10 } },
          'Showing ',
          this.state.markers.length,
          ' out of ',
          this.state.total
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Filters'
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'p',
            { className: 'control has-icon has-icon-right' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('input', { className: 'input',
              type: 'search',
              placeholder: 'Search visible area on map',
              value: this.state.searchTerm,
              onChange: function onChange(_ref2) {
                var target = _ref2.target;
                return _this11.search(target.value);
              } }),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'icon is-small' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-search' })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'p',
            { className: 'help' },
            'Search by user name or observation title.'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Observation Category'
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'select is-full-width' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'select',
                { onChange: function onChange(_ref3) {
                    var target = _ref3.target;

                    _this11.changeCategory(target.value);
                  }, value: this.state.selectedCategories.length === 1 ? this.state.selectedCategories[0] : 'all' },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'option',
                  { value: 'all' },
                  'All Categories'
                ),
                this.state.categories.map(function (category, index) {
                  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'option',
                    { value: category, key: index },
                    category
                  );
                })
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Collections'
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'select is-full-width' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'select',
                { value: this.state.selectedCollection,
                  name: 'collections',
                  onChange: function onChange(_ref4) {
                    var target = _ref4.target;
                    return _this11.changeCollection(target.value);
                  } },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'option',
                  { value: 0 },
                  'Select Collection'
                ),
                this.state.collections.map(function (collection) {
                  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'option',
                    { value: parseInt(collection.value),
                      key: collection.value },
                    collection.label
                  );
                })
              )
            ),
            this.state.filters.length === 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'help is-warning' },
              'You currently have no saved collections'
            ) : null,
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'help' },
              'You can create or add observations to a collection using the',
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'span',
                { className: 'ml-0 mr-0 icon is-small' },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-star' })
              ),
              ' icon.'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Saved Advanced Filters'
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'select is-full-width' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'select',
                { value: this.state.selectedFilter,
                  onChange: function onChange(_ref5) {
                    var target = _ref5.target;
                    return _this11.changeFilter(target.value);
                  } },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'option',
                  { value: 0 },
                  'Select Saved Filter'
                ),
                this.state.filters.map(function (filter) {
                  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'option',
                    { value: parseInt(filter.value),
                      key: filter.value },
                    filter.label
                  );
                })
              )
            ),
            this.state.filters.length === 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'help is-warning' },
              'You currently have no saved filters'
            ) : null,
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'help' },
              'You can save advanced filters by providing a label before applying the filters.'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Confirmed by Scientists'
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'select is-full-width' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'select',
                { value: this.state.selectedConfirmation,
                  onChange: function onChange(_ref6) {
                    var target = _ref6.target;
                    return _this11.changeConfirmation(target.value);
                  } },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'option',
                  { value: 0 },
                  'Show All'
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'option',
                  { value: 1 },
                  'Show only confirmed observations'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'help' },
              'Allows you to view only confirmed observations.'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'p',
          { className: 'mt-1 has-text-centered' },
          this.state.appliedAdvancedFilter || this.state.selectedFilter !== 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'a',
            { href: 'javascript:;',
              className: 'button is-danger',
              onClick: function onClick() {
                _this11.setState({ appliedAdvancedFilter: false, loading: true, selectedFilter: 0 });
                _this11.loadObservations();
              } },
            'Clear Advanced Filters'
          ) : __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'a',
            { href: 'javascript:;',
              className: 'button is-primary',
              onClick: function onClick() {
                return _this11.setState({ showFiltersModal: true });
              } },
            'More Advanced Filters'
          )
        )
      );
    }

    /**
     * Render the sidebar.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderSidebar',
    value: function _renderSidebar() {
      var _this12 = this;

      var marker = this.state.selectedMarker;
      if (marker === null && this.state.showFilters === false) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Sidebar__["a" /* default */], null);
      }

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_Sidebar__["a" /* default */],
        { onCloseRequest: function onCloseRequest() {
            if (_this12.state.showCollectionsForm || _this12.state.showFlagForm) {
              _this12.setState({
                showCollectionsForm: false,
                showFlagForm: false
              });
            } else {
              _this12.closeSidebar();
            }
          } },
        this.getSidebarContent(),
        this.state.showCollectionsForm || this.state.showFlagForm ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'sidebar-bottom-bar' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'a',
            { href: 'javascript:;', onClick: function onClick() {
                _this12.setState({
                  showCollectionsForm: false,
                  showFlagForm: false
                });
              } },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'icon is-small' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-arrow-left' })
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              null,
              'Return to Observation'
            )
          )
        ) : null
      );
    }

    /**
     * Get the correct sidebar content.
     *
     * @returns {*}
     */

  }, {
    key: 'getSidebarContent',
    value: function getSidebarContent() {
      if (this.state.showFilters) {
        return this._renderFilters();
      }

      if (this.state.selectedMarker !== null) {
        if (this.state.showCollectionsForm) {
          return this._renderCollectionsForm();
        }

        if (this.state.showFlagForm) {
          return this._renderFlagForm();
        }
        return this._renderObservation();
      }

      return null;
    }

    /**
     * Set the state to show the collections form for the
     * currently selected observation.
     */

  }, {
    key: 'showCollectionsForm',
    value: function showCollectionsForm() {
      this.setState({
        showFilters: false,
        showFlagForm: false,
        showCollectionsForm: true
      });
    }

    /**
     * Set the state to show the flag form for the
     * currently selected observation.
     */

  }, {
    key: 'showFlagForm',
    value: function showFlagForm() {
      this.setState({
        showFilters: false,
        showFlagForm: true,
        showCollectionsForm: false
      });
    }

    /**
     * Render add to collection form.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderCollectionsForm',
    value: function _renderCollectionsForm() {
      var _this13 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'p-1' },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'h4',
          { className: 'title is-4 mb-1',
            style: { maxWidth: '225px' } },
          'Add ',
          this.state.selectedMarker.title,
          ' to a collection'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__components_CollectionForm__["a" /* default */], {
          observationId: this.state.selectedMarker.id,
          collections: this.state.ownedCollections,
          onSubmit: function onSubmit(collection) {
            __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Observation added to "' + collection.label + '" successfully');
            _this13.setState({});

            // Update all collections if a new one has been created.
            var collections = _this13.state.collections;
            for (var i = 0; i < collections.length; i++) {
              if (collections[i].value === collection.id) {
                return;
              }
            }

            collections.push({
              label: collection.label,
              value: collection.id
            });

            _this13.setState({
              collections: collections,
              ownedCollections: _this13.state.ownedCollections.concat({
                label: collection.label,
                value: collection.id
              }),
              selectedMarker: _this13.filter.newCollection(_this13.state.selectedMarker, collection)
            });
          }
        }),
        this.state.selectedMarker.collections.length > 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'field mt-1' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'label',
            { className: 'label' },
            'This observation is in the following collections'
          )
        ) : null,
        this.state.selectedMarker.collections.map(function (collection) {
          return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { key: collection.id, className: 'flexbox flex-space-between flex-v-center mt-1' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              null,
              collection.label
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              null,
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'button',
                { className: 'button is-small is-outlined is-danger',
                  type: 'button',
                  onClick: function onClick() {
                    return _this13.removeCollection(_this13.state.selectedMarker, collection);
                  } },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'span',
                  { className: 'icon is-small' },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-times' })
                )
              )
            )
          );
        })
      );
    }

    /**
     * Remove collection to marker relationship.
     *
     * @param marker
     * @param collection
     */

  }, {
    key: 'removeCollection',
    value: function removeCollection(marker, collection) {
      var _this14 = this;

      axios.delete('/web/collection/detach', {
        params: {
          observation_id: marker.id,
          collection_id: collection.id
        }
      }).then(function (response) {
        _this14.setState({ selectedMarker: _this14.filter.removeCollection(marker, parseInt(collection.id)) });
        __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Observation removed from collection successfully');
      }).catch(function (error) {
        console.log(error);
      });
    }

    /**
     * Render flag observation form.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderFlagForm',
    value: function _renderFlagForm() {
      var _this15 = this;

      var flagged = this.state.selectedMarker.flags.length > 0;
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'p-1' },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'h4',
          { className: 'title is-4 mb-1',
            style: { maxWidth: '225px' } },
          'Flag ',
          this.state.selectedMarker.title
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17__components_FlagForm__["a" /* default */], {
          observationId: this.state.selectedMarker.id,
          collections: this.state.collections,
          flagged: flagged,
          flagId: flagged ? this.state.selectedMarker.flags[0].id : 0,
          onSubmit: function onSubmit(flag) {
            __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Observation has been flagged');
            _this15.setState({ selectedMarker: _this15.filter.newFlag(_this15.state.selectedMarker, flag) });
          },
          onUndo: function onUndo(flag) {
            __WEBPACK_IMPORTED_MODULE_15__components_Notify__["a" /* default */].push('Flag removed successfully');
            _this15.setState({ selectedMarker: _this15.filter.removeFlag(_this15.state.selectedMarker, parseInt(flag.id)) });
          }
        }),
        flagged ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'button',
          { className: 'button is-link',
            style: { float: 'right', position: 'relative', top: -35 },
            onClick: function onClick() {
              return _this15.setState({ showFlagForm: false });
            } },
          'Done'
        ) : null
      );
    }

    /**
     * Observation sidebar view.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderObservation',
    value: function _renderObservation() {
      var _this16 = this;

      var marker = this.state.selectedMarker;
      var data = marker.data;
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'sidebar-img',
            style: { backgroundImage: 'url(' + marker.thumbnail + ')' } },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'a',
            { href: 'javascript:;',
              className: 'sidebar-img-overlay flexbox flex-v-center flex-h-center flex-column',
              onClick: function onClick() {
                _this16.setState({ galleryImages: marker.images, showModal: true });
              } },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-photo' }),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              { className: 'has-text-centered' },
              'Click to Enlarge'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'sidebar-icons-container' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'card-footer' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'a',
              { href: 'javascript:;',
                className: 'flex-column',
                onClick: function onClick() {
                  _this16.setState({ galleryImages: marker.images, showModal: true });
                } },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-picture-o' }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'span',
                { className: 'help' },
                'Images'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'a',
              { href: 'javascript:;',
                className: 'flex-column' + (marker.collections.length > 0 ? ' is-success' : ''),
                onClick: this.showCollectionsForm.bind(this) },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-star' }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'span',
                { className: 'help' },
                'Save'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'a',
              { href: 'javascript:;',
                className: 'flex-column' + (marker.flags.length > 0 ? ' is-danger' : ''),
                onClick: this.showFlagForm.bind(this) },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-flag' }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'span',
                { className: 'help' },
                'Flag'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'sidebar-content' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'h3',
            { className: 'title is-4' },
            marker.title
          ),
          marker.custom_id ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'sidebar-item' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'h5',
              null,
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'strong',
                null,
                'Custom Tree Identifier'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'ml-1' },
              marker.custom_id
            )
          ) : null,
          marker.mobile_id ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'sidebar-item' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'h5',
              null,
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'strong',
                null,
                'ID'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'ml-1' },
              marker.mobile_id
            )
          ) : null,
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'sidebar-item' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'h5',
              null,
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'strong',
                null,
                'Collection Date'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'ml-1' },
              marker.date
            )
          ),
          Object.keys(data).map(function (key) {
            if (key.indexOf('_values') > -1 || key.indexOf('_units') > -1 || key.indexOf('_confidence') > -1) {
              return null;
            }
            var unit = null;
            if (typeof data[key + '_units'] !== 'undefined') {
              unit = data[key + '_units'];
            }
            var label = typeof __WEBPACK_IMPORTED_MODULE_12__helpers_Labels__["a" /* default */][key] !== 'undefined' ? __WEBPACK_IMPORTED_MODULE_12__helpers_Labels__["a" /* default */][key] : key;
            return _this16._renderMetaData(label, data[key], key, marker, unit);
          }),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { className: 'sidebar-item' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'h5',
              null,
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'strong',
                null,
                'Observation Page'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'p',
              { className: 'ml-1' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_14_react_router_dom__["b" /* Link */],
                { to: '/observation/' + marker.id },
                'Visit Observation Page'
              )
            )
          )
        )
      );
    }

    /**
     * Decode meta data.
     *
     * @param {string} label
     * @param {string|object} data
     * @param {string} key
     * @param {object} marker
     * @param {string} unit
     * @return {*}
     * @private
     */

  }, {
    key: '_renderMetaData',
    value: function _renderMetaData(label, data, key, marker, unit) {
      if (__WEBPACK_IMPORTED_MODULE_18__helpers_Utils__["a" /* default */].isJson(data) === true) {
        data = JSON.parse(data);
      }

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        return null;
      }

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'sidebar-item', key: key },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'h5',
          null,
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'strong',
            null,
            label
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: 'ml-1' },
          data,
          ' ',
          unit,
          key === 'comment' && marker.has_private_comments ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'p',
            { className: 'help' },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { className: 'icon is-small' },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-lock' })
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              null,
              'Only you can see this comment'
            )
          ) : null
        )
      );
    }

    /**
     * Render the filter bar and expand button.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderFilterButton',
    value: function _renderFilterButton() {
      var _this17 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'a',
        { href: 'javascript:;',
          className: 'button filters-button',
          onClick: function onClick() {
            _this17.setState({
              selectedMarker: null,
              showFilters: !_this17.state.showFilters
            });

            if (_this17.state.showFilters) {
              _this17.closeSidebar();
            } else {
              _this17.openSidebar();
            }
          } },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'span',
          { className: 'icon' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('i', { className: 'fa fa-filter' })
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'span',
          null,
          'Filters'
        )
      );
    }

    /**
     * Render a gallery image
     * @param item
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderImage',
    value: function _renderImage(item) {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'image-gallery-image' + (this.state.galleryImages.length > 1 ? ' show-scroll' : '') },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { src: item.original,
          alt: 'Plant Image' })
      );
    }

    /**
     * Render the modal that contains the gallery.
     *
     * @returns {XML}
     * @private
     */

  }, {
    key: '_renderImagesModal',
    value: function _renderImagesModal() {
      var _this18 = this;

      if (!this.state.showModal) {
        return null;
      }

      if (this.state.galleryImages.length === 0) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_Modal__["a" /* default */], { large: true, onCloseRequest: function onCloseRequest() {
            return _this18.setState({ showModal: false });
          } });
      }

      var images = [];

      this.state.galleryImages.map(function (image) {
        images.push({
          original: image
        });
      });

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7__components_Modal__["a" /* default */],
        { onCloseRequest: function onCloseRequest() {
            return _this18.setState({ showModal: false });
          } },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react_image_gallery___default.a, {
          items: images,
          showThumbnails: false,
          showFullscreenButton: false,
          showPlayButton: false,
          renderItem: this._renderImage.bind(this)
        })
      );
    }

    /**
     * Render the scene.
     *
     * @returns {XML}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this19 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: this.state.showSidebar ? 'sidebar-visible' : '' },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Navbar__["a" /* default */], { container: true }),
        this._renderSidebar(),
        this._renderMap(),
        this._renderFilterButton(),
        this._renderBottomBar(),
        this._renderImagesModal(),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_10__components_Disclaimer__["a" /* default */],
          { ref: function ref(_ref7) {
              return _this19.disclaimer = _ref7;
            } },
          'Notice: For privacy reasons, the location of the trees displayed on this map have been altered. To learn more, visit our ',
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'a',
            { href: '/faq' },
            'Frequently Asked Questions'
          ),
          ' page.'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Copyright__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Spinner__["a" /* default */], { visible: this.state.loading, containerStyle: { backgroundColor: 'rgba(255,255,255,0.8)' } }),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__components_AdvancedFiltersModal__["a" /* default */], {
          visible: this.state.showFiltersModal,
          onCloseRequest: function onCloseRequest() {
            return _this19.setState({ showFiltersModal: false });
          },
          onCreate: this.filterCreated.bind(this),
          map: true })
      );
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_21__Scene__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (App);

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

/***/ 271:
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

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'isJson',

    /**
     * Checks if a value is proper json.
     *
     * @param string
     * @returns {boolean}
     */
    value: function isJson(string) {
      try {
        JSON.parse(string);
      } catch (e) {
        return false;
      }

      return true;
    }
  }, {
    key: 'unit',
    value: function unit(_unit) {
      var units = {
        feet: window.TreeSnap.units === 'US' ? 'Feet' : 'Meters',
        inches: window.TreeSnap.units === 'US' ? 'Inches' : 'cm'
      };
      return units[_unit.toLowerCase()] || null;
    }

    /**
     * Flattens an object into an array of values only.
     *
     * @param obj
     * @returns {Array}
     */

  }, {
    key: 'flattenObject',
    value: function flattenObject(obj) {
      var _this = this;

      return Object.keys(obj).map(function (key) {
        if (Array.isArray(obj[key])) {
          return _.flattenDeep(obj[key]);
        } else if (_typeof(obj[key]) === 'object') {
          return _this.flattenObject(obj[key]);
        }

        return obj[key];
      });
    }
  }]);

  return Utils;
}();

/* harmony default export */ __webpack_exports__["a"] = (Utils);

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_InfoWindow__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_EventEmitter__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_User__ = __webpack_require__(33);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var Marker = function (_Component) {
  _inherits(Marker, _Component);

  function Marker(props) {
    _classCallCheck(this, Marker);

    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props));

    _this.marker = '';

    _this.colors = {
      'American Chestnut': 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      'Ash': 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'Hemlock': 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'White Oak': 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      'Other': 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    };

    _this.event = __WEBPACK_IMPORTED_MODULE_4__helpers_EventEmitter__["a" /* default */].listen('mapClicked', function () {
      if (_this.callout) {
        _this.callout.close();
      }
    });
    return _this;
  }

  /**
   * Creates the marker and adds it to the map.
   */


  _createClass(Marker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // Create a marker
      this.marker = new google.maps.Marker({
        title: this.props.title,
        position: {
          lat: this.props.position.latitude,
          lng: this.props.position.longitude
        },
        map: this.props.maps
      });

      // Create a Callout
      this.callout = __WEBPACK_IMPORTED_MODULE_3__helpers_InfoWindow__["a" /* default */];

      this.marker.setVisible(this.props.show);

      // Handle click events on the callout
      this.marker.addListener('click', this.openCallout.bind(this));

      var icon = void 0;
      if (this.canSeeLocation()) {
        icon = this.colors[this.marker.title] || 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';
      } else {
        icon = '/images/map/q-dot.png';
      }
      this.marker.setIcon(icon);
      this.props.onCreate(this.marker);
    }

    /**
     * Checks if the user is authorized to see the accurate location.
     *
     * @return {Boolean|boolean}
     */

  }, {
    key: 'canSeeLocation',
    value: function canSeeLocation() {
      return __WEBPACK_IMPORTED_MODULE_5__helpers_User__["a" /* default */].can('view accurate location') || __WEBPACK_IMPORTED_MODULE_5__helpers_User__["a" /* default */].owns(this.props.owner_id) || __WEBPACK_IMPORTED_MODULE_5__helpers_User__["a" /* default */].inGroupWith(this.props.owner_id);
    }

    /**
     * Open the callout window.
     */

  }, {
    key: 'openCallout',
    value: function openCallout() {
      this.callout.close();
      this.callout.setContent(this.renderCallout());
      this.callout.open(this.props.map, this.marker);
      this.props.onClick();
    }

    /**
     * Update properties when needed.
     *
     * @param nextProps
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.marker.setVisible(nextProps.show);
    }

    /**
     * Creates a DOM element for the callout
     *
     * @returns {Element}
     */

  }, {
    key: 'renderCallout',
    value: function renderCallout() {
      var callout = document.createElement('div');
      __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(this.props.children, callout);
      return callout;
    }

    /**
     * Not needed because we are using Google's JS API
     * @returns {null}
     */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.onDestroy(this.marker);
    }
  }]);

  return Marker;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Marker);


Marker.propTypes = {
  maps: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  show: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onCreate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDestroy: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  owner_id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

Marker.defaultProps = {
  title: '',
  show: true,
  onCreate: function onCreate() {},
  onClick: function onClick() {},
  onHide: function onHide() {},
  onDestroy: function onDestroy() {},

  owner_id: 0
};

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_Path__ = __webpack_require__(212);
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

/***/ 276:
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




var ButtonList = function (_Component) {
  _inherits(ButtonList, _Component);

  function ButtonList(props) {
    _classCallCheck(this, ButtonList);

    var _this = _possibleConstructorReturn(this, (ButtonList.__proto__ || Object.getPrototypeOf(ButtonList)).call(this, props));

    _this.state = {
      selected: []
    };
    return _this;
  }

  _createClass(ButtonList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.selectedByDefault) {
        this.setState({ selected: this.props.list });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.list !== this.props.list && this.props.selectedByDefault) {
        this.setState({
          selected: props.list
        });
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({ selected: [] });
    }
  }, {
    key: '_setActiveSelected',
    value: function _setActiveSelected(item) {
      return this.state.selected.indexOf(item) > -1 ? ' is-selected' : '';
    }
  }, {
    key: '_toggleSelected',
    value: function _toggleSelected(item) {
      var selected = [];
      if (this.state.selected.indexOf(item) > -1) {
        selected = this.state.selected.filter(function (one) {
          return one !== item;
        });
      } else {
        selected = this.state.selected.concat(item);
      }

      this.setState({ selected: selected });
      this.props.onChange(selected);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'control buttons-group' },
        this.props.list.map(function (item, index) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { type: 'button',
              className: 'button mb-0 button-select' + _this2._setActiveSelected(item),
              key: index,
              onClick: function onClick() {
                return _this2._toggleSelected(item);
              } },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'icon is-small' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-check' })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              item
            )
          );
        })
      );
    }
  }, {
    key: 'setSelected',
    value: function setSelected(options) {
      this.setState({ selected: options });
    }
  }]);

  return ButtonList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (ButtonList);


ButtonList.propTypes = {
  list: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  selectedByDefault: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

ButtonList.defaultProps = {
  selectedByDefault: false
};

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Marker__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_EventEmitter__ = __webpack_require__(211);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Map = function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

    _this.cluster = null;
    _this.markers = [];
    _this.colors = {
      'American Chestnut': 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      'Ash': 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'Hemlock': 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'White Oak': 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      'Other': 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    };
    return _this;
  }

  /**
   * Initializes the map.
   */


  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = {
        center: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
        },
        zoom: this.props.zoom,
        minZoom: 4,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        }
      };

      this.maps = new google.maps.Map(this.refs.mapContainer, options);

      this.setState({
        center: options.center,
        zoom: options.zoom
      });

      this.maps.addListener('idle', function () {
        _this2.props.onBoundsChange(_this2.getBounds());
      });

      this.maps.addListener('click', function () {
        return __WEBPACK_IMPORTED_MODULE_3__helpers_EventEmitter__["a" /* default */].emit('mapClicked');
      });

      this.cluster = new MarkerClusterer(this.maps, [], {
        imagePath: '/images/map/m',
        maxZoom: 7
      });

      google.maps.event.addListenerOnce(this.maps, 'idle', this.props.onLoad);
    }

    /**
     * Resize the map.
     */

  }, {
    key: 'resize',
    value: function resize() {
      var _this3 = this;

      setTimeout(function () {
        google.maps.event.trigger(_this3.maps, 'resize');
      }, 300);
    }

    /**
     * Zoom to location.
     *
     * @param center
     * @param zoom
     */

  }, {
    key: 'goTo',
    value: function goTo(center) {
      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

      this.maps.setCenter(center);
      this.maps.setZoom(zoom);
      google.maps.event.trigger(this.maps, 'idle');
    }

    /**
     * Render children (markers) by passing the map to them.
     *
     * @returns {*}
     */

  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this4 = this;

      if (this.refs && this.refs.mapContainer) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(this.props.children, function (child) {
          if (child.type === __WEBPACK_IMPORTED_MODULE_2__Marker__["a" /* default */]) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, {
              maps: _this4.maps,
              onCreate: function onCreate(marker) {
                _this4.markers.push(marker);
                _this4.createCluster();
              },
              onDestroy: function onDestroy(marker) {
                _this4.markers = _this4.markers.filter(function (m) {
                  return marker !== m;
                });
                _this4.createCluster();
                marker.setMap(null);
              }
            });
          } else {
            return child;
          }
        });
      }

      return null;
    }
  }, {
    key: 'getBounds',
    value: function getBounds() {
      return this.maps.getBounds();
    }
  }, {
    key: 'getCenter',
    value: function getCenter() {
      return this.maps.getCenter();
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      return this.maps.getZoom();
    }
  }, {
    key: 'getMaps',
    value: function getMaps() {
      return this.maps;
    }

    /**
     * Create Cluster.
     */

  }, {
    key: 'createCluster',
    value: function createCluster() {
      if (this.props.children.length === 0 && this.cluster !== null) {
        this.cluster.clearMarkers();
      }

      if (this.props.children.length > 0 && this.markers.length === this.props.children.length) {
        if (this.cluster !== null) {
          this.cluster.clearMarkers();
          this.cluster.addMarkers(this.markers);
          return;
        }

        this.cluster = new MarkerClusterer(this.maps, this.markers, {
          imagePath: '/images/map/m',
          maxZoom: 7
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        _extends({ ref: 'mapContainer' }, _.omit(this.props, [Object.keys(Map.propTypes)])),
        this.renderChildren()
      );
    }
  }]);

  return Map;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Map);


Map.propTypes = {
  center: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  zoom: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  onBoundsChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onLoad: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

Map.defaultProps = {
  center: {
    lat: 40.354388,
    lng: -95.998237
  },
  zoom: 4,
  onBoundsChange: function onBoundsChange(bounds) {},
  onLoad: function onLoad() {}
};

/***/ }),

/***/ 280:
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




var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: 'close',
    value: function close() {
      if (!this.props.permanent) {
        this.props.onCloseRequest();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'modal is-active' },
        this.props.permanent || !this.props.showClose ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { className: 'close-modal', onClick: this.close.bind(this), style: { zIndex: 999999 } },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-times' })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'modal-background', onClick: this.close.bind(this) }),
        !this.props.card ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'modal-content image-slider', style: { width: '100%', maxWidth: '700px' } },
          this.props.children
        ) : this.props.children
      );
    }
  }]);

  return Modal;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Modal);


Modal.propTypes = {
  onCloseRequest: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  permanent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showClose: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  card: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

Modal.defaultProps = {
  permanent: false,
  showClose: true,
  card: false
};

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Spinner__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_User__ = __webpack_require__(33);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var FlagForm = function (_Component) {
  _inherits(FlagForm, _Component);

  function FlagForm(props) {
    _classCallCheck(this, FlagForm);

    var _this = _possibleConstructorReturn(this, (FlagForm.__proto__ || Object.getPrototypeOf(FlagForm)).call(this, props));

    _this.state = {
      reason: 0,
      comments: '',
      errors: {
        reason: [],
        comments: []
      },
      flagged: false,
      flag_id: 0,
      loading: false
    };

    _this.reasons = ['This tree is the wrong species', 'This tree is on my private land and I would like it removed', 'This submission is spam', 'This submission is inappropriate', 'Other'];
    return _this;
  }

  _createClass(FlagForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        flagged: this.props.flagged,
        flag_id: this.props.flagId
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.flagged !== this.state.flagged) {
        this.setState({ flagged: props.flagged });
      }
    }
  }, {
    key: 'undo',
    value: function undo(event) {
      var _this2 = this;

      event.preventDefault();

      this.setState({ loading: true });
      axios.delete('/web/flag/' + this.state.flag_id).then(function (response) {
        _this2.setState({ loading: false });
        _this2.props.onUndo(response.data.data);
      }).catch(function (error) {
        _this2.setState({ loading: false });
        console.log(error);
      });
    }
  }, {
    key: 'submit',
    value: function submit(event) {
      var _this3 = this;

      event.preventDefault();

      if (!this.validate()) {
        return;
      }

      this.setState({ loading: true });

      axios.post('/web/flag', {
        observation_id: this.props.observationId,
        reason: this.state.reason,
        comments: this.state.comments
      }).then(function (response) {
        var data = response.data.data;
        // Reset Form
        _this3.setState({
          loading: false,
          reason: 0,
          comments: '',
          errors: {
            reason: [],
            comments: []
          },
          flag_id: data.id
        });

        _this3.props.onSubmit(data);
      }).catch(function (error) {
        _this3.setState({ loading: false });

        var response = error.response;

        if (response && response.status === 422) {
          var errors = response.data;
          _this3.setState({
            errors: {
              reason: errors.reason || [],
              comments: errors.comments || []
            }
          });

          return;
        }

        console.log(error);
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var errors = {
        reason: [],
        comments: []
      };
      var error = false;

      if (this.state.reason === 0) {
        errors.reason = ['The reason field is required.'];
        error = true;
      }

      if (this.state.reason === 'Other' && this.state.comments.trim() === '') {
        errors.comments = ['Please specify the other reason.'];
        error = true;
      }

      this.setState({ errors: errors });

      return !error;
    }
  }, {
    key: 'renderFlagForm',
    value: function renderFlagForm() {
      var _this4 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { action: '#', method: 'POST', onSubmit: this.submit.bind(this) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Reason'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'select' + (this.state.errors.reason.length > 0 ? ' is-danger' : '') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'select',
                { value: this.state.reason,
                  onChange: function onChange(_ref) {
                    var target = _ref.target;
                    return _this4.setState({ reason: target.value });
                  } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: '0', disabled: true },
                  '[Reason]'
                ),
                this.reasons.map(function (reason, index) {
                  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'option',
                    { value: reason, key: index },
                    reason
                  );
                })
              )
            ),
            this.state.errors.reason.map(function (error, index) {
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
            'Additional Comments'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { className: 'card-textarea-sm textarea' + (this.state.errors.comments.length > 0 ? ' is-danger' : ''),
              value: this.state.comments,
              onChange: function onChange(_ref2) {
                var target = _ref2.target;
                return _this4.setState({ comments: target.value });
              } }),
            this.state.errors.comments.map(function (error, index) {
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
              'button',
              { type: 'submit', className: 'button is-primary' },
              'Flag Observation'
            )
          )
        )
      );
    }
  }, {
    key: 'renderUndoForm',
    value: function renderUndoForm() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'notification is-success' },
          'Observation has been flagged and administrators will be notified shortly.'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { className: 'button', onClick: this.undo.bind(this) },
          'Undo'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!__WEBPACK_IMPORTED_MODULE_3__helpers_User__["a" /* default */].authenticated()) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'content' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'You must be logged in to flag this observation.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'Please ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/login' },
              'login'
            ),
            ' or ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/register' },
              'create an account'
            ),
            ' first.'
          )
        );
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        this.state.flagged ? this.renderUndoForm() : this.renderFlagForm(),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return FlagForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (FlagForm);


FlagForm.propTypes = {
  observationId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  onSubmit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  flagged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onUndo: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  flagId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

FlagForm.defaultProps = {
  flagged: 0,
  flagId: 0,
  onSubmit: function onSubmit() {},
  onUndo: function onUndo() {}
};

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Spinner__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_User__ = __webpack_require__(33);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CollectionForm = function (_Component) {
  _inherits(CollectionForm, _Component);

  function CollectionForm(props) {
    _classCallCheck(this, CollectionForm);

    var _this = _possibleConstructorReturn(this, (CollectionForm.__proto__ || Object.getPrototypeOf(CollectionForm)).call(this, props));

    _this.state = {
      loading: false,
      collection_id: 0,
      label: '',
      errors: {
        label: [],
        collection_id: []
      }
    };
    return _this;
  }

  _createClass(CollectionForm, [{
    key: 'submit',
    value: function submit(event) {
      var _this2 = this;

      event.preventDefault();

      if (!this.validate()) {
        return;
      }

      this.setState({ loading: true });

      var id = parseInt(this.state.collection_id);

      axios.post('/web/collection/attach', {
        observation_id: this.props.observationId,
        collection_id: id !== 0 ? id : '',
        label: this.state.label
      }).then(function (response) {
        _this2.setState({
          label: '',
          collection_id: 0,
          errors: {
            label: [],
            collection_id: []
          },
          loading: false
        });
        _this2.props.onSubmit(response.data.data);
      }).catch(function (error) {
        var response = error.response;
        if (response && response.status === 422) {
          var data = response.data;
          _this2.setState({
            errors: {
              label: data.label || [],
              collection_id: data.collection_id || []
            },
            loading: false
          });

          return;
        }

        console.log(error);
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var label = this.state.label;
      var collection_id = this.state.collection_id;

      if (label.trim() === '' && collection_id === 0) {
        this.setState({
          errors: {
            label: ['Please select an existing collection or type a new collection label.'],
            collection_id: []
          }
        });

        return false;
      }

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!__WEBPACK_IMPORTED_MODULE_3__helpers_User__["a" /* default */].authenticated()) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'content' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'You must be logged in to add this observation to a collection.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'Please ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/login' },
              'login'
            ),
            ' or ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/register' },
              'create an account'
            ),
            ' first.'
          )
        );
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { action: '#', method: 'POST', onSubmit: this.submit.bind(this) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'field' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            { className: 'label' },
            'Collection Name'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'select' + (this.state.errors.collection_id.length > 0 ? ' is-danger' : '') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'select',
                { value: this.state.collection_id,
                  onChange: function onChange(_ref) {
                    var target = _ref.target;
                    return _this3.setState({ collection_id: target.value });
                  } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'option',
                  { value: '0' },
                  '[Select Collection]'
                ),
                this.props.collections.map(function (collection, index) {
                  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'option',
                    { value: collection.value, key: index },
                    collection.label
                  );
                })
              )
            ),
            this.state.errors.collection_id.map(function (error, index) {
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
            'Or Create New Collection'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'control' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'input' + (this.state.errors.label.length > 0 ? ' is-danger' : ''),
              onChange: function onChange(_ref2) {
                var target = _ref2.target;
                return _this3.setState({ label: target.value });
              },
              value: this.state.label,
              placeholder: 'Type new collection label',
              readOnly: parseInt(this.state.collection_id) !== 0,
              disabled: parseInt(this.state.collection_id) !== 0
            }),
            this.state.errors.label.map(function (error, index) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'help is-danger', key: index },
                error
              );
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: 'help' },
            'The selected observation will be automatically added to the newly created collection.'
          )
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
              'Add Observation'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Spinner__["a" /* default */], { visible: this.state.loading })
      );
    }
  }]);

  return CollectionForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (CollectionForm);


CollectionForm.propTypes = {
  observationId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  collections: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  onSubmit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

CollectionForm.defaultProps = {
  collections: [],
  onSubmit: function onSubmit() {}
};

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (new google.maps.InfoWindow());

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = __webpack_require__(287);

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _lodash = __webpack_require__(289);

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = __webpack_require__(290);

var _lodash4 = _interopRequireDefault(_lodash3);

var _resizeObserverPolyfill = __webpack_require__(291);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var screenChangeEvents = ['fullscreenchange', 'MSFullscreenChange', 'mozfullscreenchange', 'webkitfullscreenchange'];

var ImageGallery = function (_React$Component) {
  _inherits(ImageGallery, _React$Component);

  function ImageGallery(props) {
    _classCallCheck(this, ImageGallery);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageGallery).call(this, props));

    _this.slideToIndex = function (index, event) {
      var _this$state = _this.state;
      var currentIndex = _this$state.currentIndex;
      var isTransitioning = _this$state.isTransitioning;


      if (!isTransitioning) {
        if (event) {
          if (_this._intervalId) {
            // user triggered event while ImageGallery is playing, reset interval
            _this.pause(false);
            _this.play(false);
          }
        }

        var slideCount = _this.props.items.length - 1;
        var nextIndex = index;

        if (index < 0) {
          nextIndex = slideCount;
        } else if (index > slideCount) {
          nextIndex = 0;
        }

        _this.setState({
          previousIndex: currentIndex,
          currentIndex: nextIndex,
          isTransitioning: nextIndex !== currentIndex,
          offsetPercentage: 0,
          style: {
            transition: 'all ' + _this.props.slideDuration + 'ms ease-out'
          }
        }, _this._onSliding);
      }
    };

    _this._onSliding = function () {
      var isTransitioning = _this.state.isTransitioning;

      _this._transitionTimer = window.setTimeout(function () {
        if (isTransitioning) {
          _this.setState({ isTransitioning: !isTransitioning });
        }
      }, _this.props.slideDuration + 50);
    };

    _this._handleScreenChange = function () {
      /*
        handles screen change events that the browser triggers e.g. esc key
      */
      var fullScreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

      if (_this.props.onScreenChange) {
        _this.props.onScreenChange(fullScreenElement);
      }

      _this.setState({ isFullscreen: !!fullScreenElement });
    };

    _this._toggleFullScreen = function () {
      if (_this.state.isFullscreen) {
        _this.exitFullScreen();
      } else {
        _this.fullScreen();
      }
    };

    _this._togglePlay = function () {
      if (_this._intervalId) {
        _this.pause();
      } else {
        _this.play();
      }
    };

    _this._initGalleryResizing = function (element) {
      /*
        When image-gallery-slide-wrapper unmounts and mounts when thumbnail bar position is changed
        ref is called twice, once with null and another with the element.
        Make sure element is available before calling observe.
      */
      if (element) {
        _this._imageGallerySlideWrapper = element;
        _this.resizeObserver = new _resizeObserverPolyfill2.default(_this._createResizeObserver);
        _this.resizeObserver.observe(element);
      }
    };

    _this._createResizeObserver = (0, _lodash4.default)(function (entries) {
      entries.forEach(function () {
        _this._handleResize();
      });
    }, 300);

    _this._handleResize = function () {
      var currentIndex = _this.state.currentIndex;

      if (_this._imageGallery) {
        _this.setState({
          galleryWidth: _this._imageGallery.offsetWidth
        });
      }

      if (_this._imageGallerySlideWrapper) {
        _this.setState({
          gallerySlideWrapperHeight: _this._imageGallerySlideWrapper.offsetHeight
        });
      }

      if (_this._thumbnailsWrapper) {
        if (_this._isThumbnailHorizontal()) {
          _this.setState({ thumbnailsWrapperHeight: _this._thumbnailsWrapper.offsetHeight });
        } else {
          _this.setState({ thumbnailsWrapperWidth: _this._thumbnailsWrapper.offsetWidth });
        }
      }

      // Adjust thumbnail container when thumbnail width or height is adjusted
      _this._setThumbsTranslate(-_this._getThumbsTranslate(currentIndex));
    };

    _this._handleKeyDown = function (event) {
      var LEFT_ARROW = 37;
      var RIGHT_ARROW = 39;
      var ESC_KEY = 27;
      var key = parseInt(event.keyCode || event.which || 0);

      switch (key) {
        case LEFT_ARROW:
          if (_this._canSlideLeft() && !_this._intervalId) {
            _this._slideLeft();
          }
          break;
        case RIGHT_ARROW:
          if (_this._canSlideRight() && !_this._intervalId) {
            _this._slideRight();
          }
          break;
        case ESC_KEY:
          if (_this.state.isFullscreen && !_this.props.useBrowserFullscreen) {
            _this.exitFullScreen();
          }
      }
    };

    _this._handleImageError = function (event) {
      if (_this.props.defaultImage && event.target.src.indexOf(_this.props.defaultImage) === -1) {
        event.target.src = _this.props.defaultImage;
      }
    };

    _this._handleOnSwiped = function (e, deltaX, deltaY, isFlick) {
      var _this$state2 = _this.state;
      var scrollingUpDown = _this$state2.scrollingUpDown;
      var scrollingLeftRight = _this$state2.scrollingLeftRight;

      if (scrollingUpDown) {
        // user stopped scrollingUpDown
        _this.setState({ scrollingUpDown: false });
      }

      if (scrollingLeftRight) {
        // user stopped scrollingLeftRight
        _this.setState({ scrollingLeftRight: false });
      }

      if (!scrollingUpDown) {
        // don't swipe if user is scrolling
        var side = deltaX > 0 ? 1 : -1;
        _this._handleOnSwipedTo(side, isFlick);
      }
    };

    _this._handleSwiping = function (e, deltaX, deltaY, delta) {
      var _this$state3 = _this.state;
      var galleryWidth = _this$state3.galleryWidth;
      var isTransitioning = _this$state3.isTransitioning;
      var scrollingUpDown = _this$state3.scrollingUpDown;
      var swipingTransitionDuration = _this.props.swipingTransitionDuration;

      _this._setScrollDirection(deltaX, deltaY);
      if (!isTransitioning && !scrollingUpDown) {
        var side = deltaX < 0 ? 1 : -1;

        var offsetPercentage = delta / galleryWidth * 100;
        if (Math.abs(offsetPercentage) >= 100) {
          offsetPercentage = 100;
        }

        var swipingTransition = {
          transition: 'transform ' + swipingTransitionDuration + 'ms ease-out'
        };

        _this.setState({
          offsetPercentage: side * offsetPercentage,
          style: swipingTransition
        });
      } else {
        // don't move the slide
        _this.setState({ offsetPercentage: 0 });
      }
    };

    _this._slideLeft = function (event) {
      _this.slideToIndex(_this.state.currentIndex - 1, event);
    };

    _this._slideRight = function (event) {
      _this.slideToIndex(_this.state.currentIndex + 1, event);
    };

    _this._renderItem = function (item) {
      var onImageError = _this.props.onImageError || _this._handleImageError;

      return _react2.default.createElement(
        'div',
        { className: 'image-gallery-image' },
        item.imageSet ? _react2.default.createElement(
          'picture',
          {
            onLoad: _this.props.onImageLoad,
            onError: onImageError
          },
          item.imageSet.map(function (source, index) {
            return _react2.default.createElement('source', {
              key: index,
              media: source.media,
              srcSet: source.srcSet
            });
          }),
          _react2.default.createElement('img', {
            alt: item.originalAlt,
            src: item.original
          })
        ) : _react2.default.createElement('img', {
          src: item.original,
          alt: item.originalAlt,
          srcSet: item.srcSet,
          sizes: item.sizes,
          title: item.originalTitle,
          onLoad: _this.props.onImageLoad,
          onError: onImageError
        }),
        item.description && _react2.default.createElement(
          'span',
          { className: 'image-gallery-description' },
          item.description
        )
      );
    };

    _this._renderThumbInner = function (item) {
      var onThumbnailError = _this.props.onThumbnailError || _this._handleImageError;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', {
          src: item.thumbnail,
          alt: item.thumbnailAlt,
          title: item.thumbnailTitle,
          onError: onThumbnailError
        }),
        _react2.default.createElement(
          'div',
          { className: 'image-gallery-thumbnail-label' },
          item.thumbnailLabel
        )
      );
    };

    _this._onThumbnailClick = function (event, index) {
      _this.slideToIndex(index, event);
      if (_this.props.onThumbnailClick) {
        _this.props.onThumbnailClick(event, index);
      }
    };

    _this.state = {
      currentIndex: props.startIndex,
      thumbsTranslate: 0,
      offsetPercentage: 0,
      galleryWidth: 0,
      thumbnailsWrapperWidth: 0,
      thumbnailsWrapperHeight: 0,
      isFullscreen: false,
      isPlaying: false
    };

    // Used to update the throttle if slideDuration changes
    _this._unthrottledSlideToIndex = _this.slideToIndex;
    _this.slideToIndex = (0, _lodash2.default)(_this._unthrottledSlideToIndex, props.slideDuration, { trailing: false });

    if (props.lazyLoad) {
      _this._lazyLoaded = [];
    }
    return _this;
  }

  _createClass(ImageGallery, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.disableArrowKeys !== nextProps.disableArrowKeys) {
        if (nextProps.disableArrowKeys) {
          window.removeEventListener('keydown', this._handleKeyDown);
        } else {
          window.addEventListener('keydown', this._handleKeyDown);
        }
      }

      if (nextProps.lazyLoad && (!this.props.lazyLoad || this.props.items !== nextProps.items)) {
        this._lazyLoaded = [];
      }

      if (this.state.currentIndex >= nextProps.items.length) {
        this.slideToIndex(0);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var itemsChanged = prevProps.items.length !== this.props.items.length;
      if (itemsChanged) {
        this._handleResize();
      }
      if (prevState.currentIndex !== this.state.currentIndex) {
        if (this.props.onSlide) {
          this.props.onSlide(this.state.currentIndex);
        }

        this._updateThumbnailTranslate(prevState.currentIndex);
      }

      if (prevProps.slideDuration !== this.props.slideDuration) {
        this.slideToIndex = (0, _lodash2.default)(this._unthrottledSlideToIndex, this.props.slideDuration, { trailing: false });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoPlay) {
        this.play();
      }
      if (!this.props.disableArrowKeys) {
        window.addEventListener('keydown', this._handleKeyDown);
      }
      this._onScreenChangeEvent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.props.disableArrowKeys) {
        window.removeEventListener('keydown', this._handleKeyDown);
      }

      this._offScreenChangeEvent();

      if (this._intervalId) {
        window.clearInterval(this._intervalId);
        this._intervalId = null;
      }

      if (this.resizeObserver && this._imageGallerySlideWrapper) {
        this.resizeObserver.unobserve(this._imageGallerySlideWrapper);
      }

      if (this._transitionTimer) {
        window.clearTimeout(this._transitionTimer);
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!this._intervalId) {
        var _props = this.props;
        var slideInterval = _props.slideInterval;
        var slideDuration = _props.slideDuration;

        this.setState({ isPlaying: true });
        this._intervalId = window.setInterval(function () {
          if (!_this2.state.hovering) {
            if (!_this2.props.infinite && !_this2._canSlideRight()) {
              _this2.pause();
            } else {
              _this2.slideToIndex(_this2.state.currentIndex + 1);
            }
          }
        }, Math.max(slideInterval, slideDuration));

        if (this.props.onPlay && callback) {
          this.props.onPlay(this.state.currentIndex);
        }
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (this._intervalId) {
        window.clearInterval(this._intervalId);
        this._intervalId = null;
        this.setState({ isPlaying: false });

        if (this.props.onPause && callback) {
          this.props.onPause(this.state.currentIndex);
        }
      }
    }
  }, {
    key: 'setModalFullscreen',
    value: function setModalFullscreen(state) {
      this.setState({ modalFullscreen: state });
      // manually call because browser does not support screenchange events
      if (this.props.onScreenChange) {
        this.props.onScreenChange(state);
      }
    }
  }, {
    key: 'fullScreen',
    value: function fullScreen() {
      var gallery = this._imageGallery;

      if (this.props.useBrowserFullscreen) {
        if (gallery.requestFullscreen) {
          gallery.requestFullscreen();
        } else if (gallery.msRequestFullscreen) {
          gallery.msRequestFullscreen();
        } else if (gallery.mozRequestFullScreen) {
          gallery.mozRequestFullScreen();
        } else if (gallery.webkitRequestFullscreen) {
          gallery.webkitRequestFullscreen();
        } else {
          // fallback to fullscreen modal for unsupported browsers
          this.setModalFullscreen(true);
        }
      } else {
        this.setModalFullscreen(true);
      }

      this.setState({ isFullscreen: true });
    }
  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {
      if (this.state.isFullscreen) {
        if (this.props.useBrowserFullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else {
            // fallback to fullscreen modal for unsupported browsers
            this.setModalFullscreen(false);
          }
        } else {
          this.setModalFullscreen(false);
        }

        this.setState({ isFullscreen: false });
      }
    }
  }, {
    key: 'getCurrentIndex',
    value: function getCurrentIndex() {
      return this.state.currentIndex;
    }
  }, {
    key: '_onScreenChangeEvent',
    value: function _onScreenChangeEvent() {
      var _this3 = this;

      screenChangeEvents.map(function (eventName) {
        document.addEventListener(eventName, _this3._handleScreenChange);
      });
    }
  }, {
    key: '_offScreenChangeEvent',
    value: function _offScreenChangeEvent() {
      var _this4 = this;

      screenChangeEvents.map(function (eventName) {
        document.removeEventListener(eventName, _this4._handleScreenChange);
      });
    }
  }, {
    key: '_isThumbnailHorizontal',
    value: function _isThumbnailHorizontal() {
      var thumbnailPosition = this.props.thumbnailPosition;

      return thumbnailPosition === 'left' || thumbnailPosition === 'right';
    }
  }, {
    key: '_setScrollDirection',
    value: function _setScrollDirection(deltaX, deltaY) {
      var _state = this.state;
      var scrollingUpDown = _state.scrollingUpDown;
      var scrollingLeftRight = _state.scrollingLeftRight;

      var x = Math.abs(deltaX);
      var y = Math.abs(deltaY);

      // If y > x the user is scrolling up and down
      if (y > x && !scrollingUpDown && !scrollingLeftRight) {
        this.setState({ scrollingUpDown: true });
      } else if (!scrollingLeftRight && !scrollingUpDown) {
        this.setState({ scrollingLeftRight: true });
      }
    }
  }, {
    key: '_handleOnSwipedTo',
    value: function _handleOnSwipedTo(side, isFlick) {
      var _state2 = this.state;
      var currentIndex = _state2.currentIndex;
      var isTransitioning = _state2.isTransitioning;

      var slideTo = currentIndex;

      if ((this._sufficientSwipeOffset() || isFlick) && !isTransitioning) {
        slideTo += side;
      }

      if (side < 0) {
        if (!this._canSlideLeft()) {
          slideTo = currentIndex;
        }
      } else {
        if (!this._canSlideRight()) {
          slideTo = currentIndex;
        }
      }

      this._unthrottledSlideToIndex(slideTo);
    }
  }, {
    key: '_sufficientSwipeOffset',
    value: function _sufficientSwipeOffset() {
      return Math.abs(this.state.offsetPercentage) > this.props.swipeThreshold;
    }
  }, {
    key: '_canNavigate',
    value: function _canNavigate() {
      return this.props.items.length >= 2;
    }
  }, {
    key: '_canSlideLeft',
    value: function _canSlideLeft() {
      return this.props.infinite || this.state.currentIndex > 0;
    }
  }, {
    key: '_canSlideRight',
    value: function _canSlideRight() {
      return this.props.infinite || this.state.currentIndex < this.props.items.length - 1;
    }
  }, {
    key: '_updateThumbnailTranslate',
    value: function _updateThumbnailTranslate(previousIndex) {
      var _state3 = this.state;
      var thumbsTranslate = _state3.thumbsTranslate;
      var currentIndex = _state3.currentIndex;

      if (this.state.currentIndex === 0) {
        this._setThumbsTranslate(0);
      } else {
        var indexDifference = Math.abs(previousIndex - currentIndex);
        var scroll = this._getThumbsTranslate(indexDifference);
        if (scroll > 0) {
          if (previousIndex < currentIndex) {
            this._setThumbsTranslate(thumbsTranslate - scroll);
          } else if (previousIndex > currentIndex) {
            this._setThumbsTranslate(thumbsTranslate + scroll);
          }
        }
      }
    }
  }, {
    key: '_setThumbsTranslate',
    value: function _setThumbsTranslate(thumbsTranslate) {
      this.setState({ thumbsTranslate: thumbsTranslate });
    }
  }, {
    key: '_getThumbsTranslate',
    value: function _getThumbsTranslate(indexDifference) {
      if (this.props.disableThumbnailScroll) {
        return 0;
      }

      var _state4 = this.state;
      var thumbnailsWrapperWidth = _state4.thumbnailsWrapperWidth;
      var thumbnailsWrapperHeight = _state4.thumbnailsWrapperHeight;

      var totalScroll = void 0;

      if (this._thumbnails) {
        // total scroll required to see the last thumbnail
        if (this._isThumbnailHorizontal()) {
          if (this._thumbnails.scrollHeight <= thumbnailsWrapperHeight) {
            return 0;
          }
          totalScroll = this._thumbnails.scrollHeight - thumbnailsWrapperHeight;
        } else {
          if (this._thumbnails.scrollWidth <= thumbnailsWrapperWidth || thumbnailsWrapperWidth <= 0) {
            return 0;
          }
          totalScroll = this._thumbnails.scrollWidth - thumbnailsWrapperWidth;
        }

        var totalThumbnails = this._thumbnails.children.length;
        // scroll-x required per index change
        var perIndexScroll = totalScroll / (totalThumbnails - 1);

        return indexDifference * perIndexScroll;
      }
    }
  }, {
    key: '_getAlignmentClassName',
    value: function _getAlignmentClassName(index) {
      // LEFT, and RIGHT alignments are necessary for lazyLoad
      var currentIndex = this.state.currentIndex;

      var alignment = '';
      var LEFT = 'left';
      var CENTER = 'center';
      var RIGHT = 'right';

      switch (index) {
        case currentIndex - 1:
          alignment = ' ' + LEFT;
          break;
        case currentIndex:
          alignment = ' ' + CENTER;
          break;
        case currentIndex + 1:
          alignment = ' ' + RIGHT;
          break;
      }

      if (this.props.items.length >= 3 && this.props.infinite) {
        if (index === 0 && currentIndex === this.props.items.length - 1) {
          // set first slide as right slide if were sliding right from last slide
          alignment = ' ' + RIGHT;
        } else if (index === this.props.items.length - 1 && currentIndex === 0) {
          // set last slide as left slide if were sliding left from first slide
          alignment = ' ' + LEFT;
        }
      }

      return alignment;
    }
  }, {
    key: '_isGoingFromFirstToLast',
    value: function _isGoingFromFirstToLast() {
      var _state5 = this.state;
      var currentIndex = _state5.currentIndex;
      var previousIndex = _state5.previousIndex;

      var totalSlides = this.props.items.length - 1;
      return previousIndex === 0 && currentIndex === totalSlides;
    }
  }, {
    key: '_isGoingFromLastToFirst',
    value: function _isGoingFromLastToFirst() {
      var _state6 = this.state;
      var currentIndex = _state6.currentIndex;
      var previousIndex = _state6.previousIndex;

      var totalSlides = this.props.items.length - 1;
      return previousIndex === totalSlides && currentIndex === 0;
    }
  }, {
    key: '_getTranslateXForTwoSlide',
    value: function _getTranslateXForTwoSlide(index) {
      // For taking care of infinite swipe when there are only two slides
      var _state7 = this.state;
      var currentIndex = _state7.currentIndex;
      var offsetPercentage = _state7.offsetPercentage;
      var previousIndex = _state7.previousIndex;

      var baseTranslateX = -100 * currentIndex;
      var translateX = baseTranslateX + index * 100 + offsetPercentage;

      // keep track of user swiping direction
      if (offsetPercentage > 0) {
        this.direction = 'left';
      } else if (offsetPercentage < 0) {
        this.direction = 'right';
      }

      // when swiping make sure the slides are on the correct side
      if (currentIndex === 0 && index === 1 && offsetPercentage > 0) {
        translateX = -100 + offsetPercentage;
      } else if (currentIndex === 1 && index === 0 && offsetPercentage < 0) {
        translateX = 100 + offsetPercentage;
      }

      if (currentIndex !== previousIndex) {
        // when swiped move the slide to the correct side
        if (previousIndex === 0 && index === 0 && offsetPercentage === 0 && this.direction === 'left') {
          translateX = 100;
        } else if (previousIndex === 1 && index === 1 && offsetPercentage === 0 && this.direction === 'right') {
          translateX = -100;
        }
      } else {
        // keep the slide on the correct slide even when not a swipe
        if (currentIndex === 0 && index === 1 && offsetPercentage === 0 && this.direction === 'left') {
          translateX = -100;
        } else if (currentIndex === 1 && index === 0 && offsetPercentage === 0 && this.direction === 'right') {
          translateX = 100;
        }
      }

      return translateX;
    }
  }, {
    key: '_getThumbnailBarHeight',
    value: function _getThumbnailBarHeight() {
      if (this._isThumbnailHorizontal()) {
        return {
          height: this.state.gallerySlideWrapperHeight
        };
      }
      return {};
    }
  }, {
    key: '_shouldPushSlideOnInfiniteMode',
    value: function _shouldPushSlideOnInfiniteMode(index) {
      /*
        Push(show) slide if slide is the current slide, and the next slide
        OR
        The slide is going more than 1 slide left, or right, but not going from
        first to last and not going from last to first
         There is an edge case where if you go to the first or last slide, when they're
        not left, or right of each other they will try to catch up in the background
        so unless were going from first to last or vice versa we don't want the first
        or last slide to show up during our transition
      */
      return !this._slideIsTransitioning(index) || this._ignoreIsTransitioning() && !this._isFirstOrLastSlide(index);
    }
  }, {
    key: '_slideIsTransitioning',
    value: function _slideIsTransitioning(index) {
      /*
      returns true if the gallery is transitioning and the index is not the
      previous or currentIndex
      */
      var _state8 = this.state;
      var isTransitioning = _state8.isTransitioning;
      var previousIndex = _state8.previousIndex;
      var currentIndex = _state8.currentIndex;

      var indexIsNotPreviousOrNextSlide = !(index === previousIndex || index === currentIndex);
      return isTransitioning && indexIsNotPreviousOrNextSlide;
    }
  }, {
    key: '_isFirstOrLastSlide',
    value: function _isFirstOrLastSlide(index) {
      var totalSlides = this.props.items.length - 1;
      var isLastSlide = index === totalSlides;
      var isFirstSlide = index === 0;
      return isLastSlide || isFirstSlide;
    }
  }, {
    key: '_ignoreIsTransitioning',
    value: function _ignoreIsTransitioning() {
      /*
        Ignore isTransitioning because were not going to sibling slides
        e.g. center to left or center to right
      */
      var _state9 = this.state;
      var previousIndex = _state9.previousIndex;
      var currentIndex = _state9.currentIndex;

      var totalSlides = this.props.items.length - 1;
      // we want to show the in between slides transition
      var slidingMoreThanOneSlideLeftOrRight = Math.abs(previousIndex - currentIndex) > 1;
      var notGoingFromFirstToLast = !(previousIndex === 0 && currentIndex === totalSlides);
      var notGoingFromLastToFirst = !(previousIndex === totalSlides && currentIndex === 0);

      return slidingMoreThanOneSlideLeftOrRight && notGoingFromFirstToLast && notGoingFromLastToFirst;
    }
  }, {
    key: '_getSlideStyle',
    value: function _getSlideStyle(index) {
      var _state10 = this.state;
      var currentIndex = _state10.currentIndex;
      var offsetPercentage = _state10.offsetPercentage;
      var _props2 = this.props;
      var infinite = _props2.infinite;
      var items = _props2.items;
      var useTranslate3D = _props2.useTranslate3D;

      var baseTranslateX = -100 * currentIndex;
      var totalSlides = items.length - 1;

      // calculates where the other slides belong based on currentIndex
      var translateX = baseTranslateX + index * 100 + offsetPercentage;

      if (infinite && items.length > 2) {
        if (currentIndex === 0 && index === totalSlides) {
          // make the last slide the slide before the first
          translateX = -100 + offsetPercentage;
        } else if (currentIndex === totalSlides && index === 0) {
          // make the first slide the slide after the last
          translateX = 100 + offsetPercentage;
        }
      }

      // Special case when there are only 2 items with infinite on
      if (infinite && items.length === 2) {
        translateX = this._getTranslateXForTwoSlide(index);
      }

      var translate = 'translate(' + translateX + '%, 0)';

      if (useTranslate3D) {
        translate = 'translate3d(' + translateX + '%, 0, 0)';
      }

      return {
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        transform: translate
      };
    }
  }, {
    key: '_getThumbnailStyle',
    value: function _getThumbnailStyle() {
      var translate = void 0;
      var useTranslate3D = this.props.useTranslate3D;


      if (this._isThumbnailHorizontal()) {
        translate = 'translate(0, ' + this.state.thumbsTranslate + 'px)';
        if (useTranslate3D) {
          translate = 'translate3d(0, ' + this.state.thumbsTranslate + 'px, 0)';
        }
      } else {
        translate = 'translate(' + this.state.thumbsTranslate + 'px, 0)';
        if (useTranslate3D) {
          translate = 'translate3d(' + this.state.thumbsTranslate + 'px, 0, 0)';
        }
      }
      return {
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        transform: translate
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state11 = this.state;
      var currentIndex = _state11.currentIndex;
      var isFullscreen = _state11.isFullscreen;
      var modalFullscreen = _state11.modalFullscreen;
      var isPlaying = _state11.isPlaying;
      var scrollingLeftRight = _state11.scrollingLeftRight;
      var _props3 = this.props;
      var infinite = _props3.infinite;
      var preventDefaultTouchmoveEvent = _props3.preventDefaultTouchmoveEvent;


      var thumbnailStyle = this._getThumbnailStyle();
      var thumbnailPosition = this.props.thumbnailPosition;

      var slideLeft = this._slideLeft;
      var slideRight = this._slideRight;

      var slides = [];
      var thumbnails = [];
      var bullets = [];

      this.props.items.forEach(function (item, index) {
        var alignment = _this5._getAlignmentClassName(index);
        var originalClass = item.originalClass ? ' ' + item.originalClass : '';
        var thumbnailClass = item.thumbnailClass ? ' ' + item.thumbnailClass : '';

        var renderItem = item.renderItem || _this5.props.renderItem || _this5._renderItem;

        var renderThumbInner = item.renderThumbInner || _this5.props.renderThumbInner || _this5._renderThumbInner;

        var showItem = !_this5.props.lazyLoad || alignment || _this5._lazyLoaded[index];
        if (showItem && _this5.props.lazyLoad) {
          _this5._lazyLoaded[index] = true;
        }

        var slideStyle = _this5._getSlideStyle(index);

        var slide = _react2.default.createElement(
          'div',
          {
            key: index,
            className: 'image-gallery-slide' + alignment + originalClass,
            style: _extends(slideStyle, _this5.state.style),
            onClick: _this5.props.onClick,
            onTouchMove: _this5.props.onTouchMove,
            onTouchEnd: _this5.props.onTouchEnd,
            onTouchStart: _this5.props.onTouchStart,
            onMouseOver: _this5.props.onMouseOver,
            onMouseLeave: _this5.props.onMouseLeave,
            role: _this5.props.onClick && 'button'
          },
          showItem ? renderItem(item) : _react2.default.createElement('div', { style: { height: '100%' } })
        );

        if (infinite) {
          // don't add some slides while transitioning to avoid background transitions
          if (_this5._shouldPushSlideOnInfiniteMode(index)) {
            slides.push(slide);
          }
        } else {
          slides.push(slide);
        }

        if (_this5.props.showThumbnails) {
          thumbnails.push(_react2.default.createElement(
            'a',
            {
              key: index,
              role: 'button',
              'aria-pressed': currentIndex === index ? 'true' : 'false',
              'aria-label': 'Go to Slide ' + (index + 1),
              className: 'image-gallery-thumbnail' + (currentIndex === index ? ' active' : '') + thumbnailClass,
              onClick: function onClick(event) {
                return _this5._onThumbnailClick(event, index);
              }
            },
            renderThumbInner(item)
          ));
        }

        if (_this5.props.showBullets) {
          var bulletOnClick = function bulletOnClick(event) {
            if (item.bulletOnClick) {
              item.bulletOnClick({ item: item, itemIndex: index, currentIndex: currentIndex });
            }
            return _this5.slideToIndex.call(_this5, index, event);
          };
          bullets.push(_react2.default.createElement('button', {
            key: index,
            type: 'button',
            className: ['image-gallery-bullet', currentIndex === index ? 'active' : '', item.bulletClass || ''].join(' '),
            onClick: bulletOnClick,
            'aria-pressed': currentIndex === index ? 'true' : 'false',
            'aria-label': 'Go to Slide ' + (index + 1)
          }));
        }
      });

      var slideWrapper = _react2.default.createElement(
        'div',
        {
          ref: this._initGalleryResizing,
          className: 'image-gallery-slide-wrapper ' + thumbnailPosition
        },
        this.props.renderCustomControls && this.props.renderCustomControls(),
        this.props.showFullscreenButton && this.props.renderFullscreenButton(this._toggleFullScreen, isFullscreen),
        this.props.showPlayButton && this.props.renderPlayPauseButton(this._togglePlay, isPlaying),
        this._canNavigate() ? [this.props.showNav && _react2.default.createElement(
          'span',
          { key: 'navigation' },
          this.props.renderLeftNav(slideLeft, !this._canSlideLeft()),
          this.props.renderRightNav(slideRight, !this._canSlideRight())
        ), _react2.default.createElement(
          _reactSwipeable2.default,
          {
            className: 'image-gallery-swipe',
            disabled: this.props.disableSwipe,
            key: 'swipeable',
            delta: 0,
            flickThreshold: this.props.flickThreshold,
            onSwiping: this._handleSwiping,
            onSwiped: this._handleOnSwiped,
            stopPropagation: this.props.stopPropagation,
            preventDefaultTouchmoveEvent: preventDefaultTouchmoveEvent || scrollingLeftRight
          },
          _react2.default.createElement(
            'div',
            { className: 'image-gallery-slides' },
            slides
          )
        )] : _react2.default.createElement(
          'div',
          { className: 'image-gallery-slides' },
          slides
        ),
        this.props.showBullets && _react2.default.createElement(
          'div',
          { className: 'image-gallery-bullets' },
          _react2.default.createElement(
            'div',
            {
              className: 'image-gallery-bullets-container',
              role: 'navigation',
              'aria-label': 'Bullet Navigation'
            },
            bullets
          )
        ),
        this.props.showIndex && _react2.default.createElement(
          'div',
          { className: 'image-gallery-index' },
          _react2.default.createElement(
            'span',
            { className: 'image-gallery-index-current' },
            this.state.currentIndex + 1
          ),
          _react2.default.createElement(
            'span',
            { className: 'image-gallery-index-separator' },
            this.props.indexSeparator
          ),
          _react2.default.createElement(
            'span',
            { className: 'image-gallery-index-total' },
            this.props.items.length
          )
        )
      );

      var classNames = ['image-gallery', this.props.additionalClass, modalFullscreen ? 'fullscreen-modal' : ''].filter(function (name) {
        return typeof name === 'string';
      }).join(' ');

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(i) {
            return _this5._imageGallery = i;
          },
          className: classNames,
          'aria-live': 'polite'
        },
        _react2.default.createElement(
          'div',
          {
            className: 'image-gallery-content' + (isFullscreen ? ' fullscreen' : '')
          },
          (thumbnailPosition === 'bottom' || thumbnailPosition === 'right') && slideWrapper,
          this.props.showThumbnails && _react2.default.createElement(
            'div',
            {
              className: 'image-gallery-thumbnails-wrapper ' + thumbnailPosition,
              style: this._getThumbnailBarHeight()
            },
            _react2.default.createElement(
              'div',
              {
                className: 'image-gallery-thumbnails',
                ref: function ref(i) {
                  return _this5._thumbnailsWrapper = i;
                }
              },
              _react2.default.createElement(
                'div',
                {
                  ref: function ref(t) {
                    return _this5._thumbnails = t;
                  },
                  className: 'image-gallery-thumbnails-container',
                  style: thumbnailStyle,
                  'aria-label': 'Thumbnail Navigation'
                },
                thumbnails
              )
            )
          ),
          (thumbnailPosition === 'top' || thumbnailPosition === 'left') && slideWrapper
        )
      );
    }
  }]);

  return ImageGallery;
}(_react2.default.Component);

ImageGallery.propTypes = {
  flickThreshold: _propTypes2.default.number,
  items: _propTypes2.default.array.isRequired,
  showNav: _propTypes2.default.bool,
  autoPlay: _propTypes2.default.bool,
  lazyLoad: _propTypes2.default.bool,
  infinite: _propTypes2.default.bool,
  showIndex: _propTypes2.default.bool,
  showBullets: _propTypes2.default.bool,
  showThumbnails: _propTypes2.default.bool,
  showPlayButton: _propTypes2.default.bool,
  showFullscreenButton: _propTypes2.default.bool,
  disableThumbnailScroll: _propTypes2.default.bool,
  disableArrowKeys: _propTypes2.default.bool,
  disableSwipe: _propTypes2.default.bool,
  useBrowserFullscreen: _propTypes2.default.bool,
  preventDefaultTouchmoveEvent: _propTypes2.default.bool,
  defaultImage: _propTypes2.default.string,
  indexSeparator: _propTypes2.default.string,
  thumbnailPosition: _propTypes2.default.string,
  startIndex: _propTypes2.default.number,
  slideDuration: _propTypes2.default.number,
  slideInterval: _propTypes2.default.number,
  swipeThreshold: _propTypes2.default.number,
  swipingTransitionDuration: _propTypes2.default.number,
  onSlide: _propTypes2.default.func,
  onScreenChange: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onImageLoad: _propTypes2.default.func,
  onImageError: _propTypes2.default.func,
  onTouchMove: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onMouseOver: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onThumbnailError: _propTypes2.default.func,
  onThumbnailClick: _propTypes2.default.func,
  renderCustomControls: _propTypes2.default.func,
  renderLeftNav: _propTypes2.default.func,
  renderRightNav: _propTypes2.default.func,
  renderPlayPauseButton: _propTypes2.default.func,
  renderFullscreenButton: _propTypes2.default.func,
  renderItem: _propTypes2.default.func,
  stopPropagation: _propTypes2.default.bool,
  additionalClass: _propTypes2.default.string,
  useTranslate3D: _propTypes2.default.bool
};
ImageGallery.defaultProps = {
  items: [],
  showNav: true,
  autoPlay: false,
  lazyLoad: false,
  infinite: true,
  showIndex: false,
  showBullets: false,
  showThumbnails: true,
  showPlayButton: true,
  showFullscreenButton: true,
  disableThumbnailScroll: false,
  disableArrowKeys: false,
  disableSwipe: false,
  useTranslate3D: true,
  useBrowserFullscreen: true,
  preventDefaultTouchmoveEvent: false,
  flickThreshold: 0.4,
  stopPropagation: false,
  indexSeparator: ' / ',
  thumbnailPosition: 'bottom',
  startIndex: 0,
  slideDuration: 450,
  swipingTransitionDuration: 0,
  slideInterval: 3000,
  swipeThreshold: 30,
  renderLeftNav: function renderLeftNav(onClick, disabled) {
    return _react2.default.createElement('button', {
      type: 'button',
      className: 'image-gallery-left-nav',
      disabled: disabled,
      onClick: onClick,
      'aria-label': 'Previous Slide'
    });
  },
  renderRightNav: function renderRightNav(onClick, disabled) {
    return _react2.default.createElement('button', {
      type: 'button',
      className: 'image-gallery-right-nav',
      disabled: disabled,
      onClick: onClick,
      'aria-label': 'Next Slide'
    });
  },
  renderPlayPauseButton: function renderPlayPauseButton(onClick, isPlaying) {
    return _react2.default.createElement('button', {
      type: 'button',
      className: 'image-gallery-play-button' + (isPlaying ? ' active' : ''),
      onClick: onClick,
      'aria-label': 'Play or Pause Slideshow'
    });
  },
  renderFullscreenButton: function renderFullscreenButton(onClick, isFullscreen) {
    return _react2.default.createElement('button', {
      type: 'button',
      className: 'image-gallery-fullscreen-button' + (isFullscreen ? ' active' : ''),
      onClick: onClick,
      'aria-label': 'Open Fullscreen'
    });
  }
};
exports.default = ImageGallery;

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var PropTypes = __webpack_require__(2);
var DetectPassiveEvents = __webpack_require__(288).default;

function getInitialState() {
  return {
    x: null,
    y: null,
    swiping: false,
    start: 0
  };
}

function getMovingPosition(e) {
  return 'changedTouches' in e ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
}
function getPosition(e) {
  return 'touches' in e ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
}

function rotateByAngle(pos, angle) {
  if (angle === 0) {
    return pos;
  }

  var x = pos.x,
      y = pos.y;


  var angleInRadians = Math.PI / 180 * angle;
  var rotatedX = x * Math.cos(angleInRadians) + y * Math.sin(angleInRadians);
  var rotatedY = y * Math.cos(angleInRadians) - x * Math.sin(angleInRadians);
  return { x: rotatedX, y: rotatedY };
}

function calculatePos(e, state) {
  var _rotateByAngle = rotateByAngle(getMovingPosition(e), state.rotationAngle),
      x = _rotateByAngle.x,
      y = _rotateByAngle.y;

  var deltaX = state.x - x;
  var deltaY = state.y - y;

  var absX = Math.abs(deltaX);
  var absY = Math.abs(deltaY);

  var time = Date.now() - state.start;
  var velocity = Math.sqrt(absX * absX + absY * absY) / time;

  return { deltaX: deltaX, deltaY: deltaY, absX: absX, absY: absY, velocity: velocity };
}

var Swipeable = function (_React$Component) {
  _inherits(Swipeable, _React$Component);

  function Swipeable(props, context) {
    _classCallCheck(this, Swipeable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.swipeable = getInitialState();

    _this.eventStart = _this.eventStart.bind(_this);
    _this.eventMove = _this.eventMove.bind(_this);
    _this.eventEnd = _this.eventEnd.bind(_this);
    _this.mouseDown = _this.mouseDown.bind(_this);
    _this.mouseMove = _this.mouseMove.bind(_this);
    _this.mouseUp = _this.mouseUp.bind(_this);
    _this.cleanupMouseListeners = _this.cleanupMouseListeners.bind(_this);
    _this.setupMouseListeners = _this.setupMouseListeners.bind(_this);
    _this.elementRef = _this.elementRef.bind(_this);
    _this.setupTouchmoveEvent = _this.setupTouchmoveEvent.bind(_this);
    _this.cleanupTouchmoveEvent = _this.cleanupTouchmoveEvent.bind(_this);

    _this.hasPassiveSupport = DetectPassiveEvents.hasSupport;
    return _this;
  }

  Swipeable.prototype.componentDidMount = function componentDidMount() {
    if (this.props.preventDefaultTouchmoveEvent) {
      this.setupTouchmoveEvent();
    }
  };

  Swipeable.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.disabled !== this.props.disabled) {
      this.cleanupMouseListeners();

      this.swipeable = getInitialState();
    }

    if (prevProps.preventDefaultTouchmoveEvent && !this.props.preventDefaultTouchmoveEvent) {
      this.cleanupTouchmoveEvent();
    } else if (!prevProps.preventDefaultTouchmoveEvent && this.props.preventDefaultTouchmoveEvent) {
      this.setupTouchmoveEvent();
    }
  };

  Swipeable.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cleanupMouseListeners();
  };

  Swipeable.prototype.setupTouchmoveEvent = function setupTouchmoveEvent() {
    if (this.element && this.hasPassiveSupport) {
      this.element.addEventListener('touchmove', this.eventMove, { passive: false });
    }
  };

  Swipeable.prototype.setupMouseListeners = function setupMouseListeners() {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  Swipeable.prototype.cleanupTouchmoveEvent = function cleanupTouchmoveEvent() {
    if (this.element && this.hasPassiveSupport) {
      this.element.removeEventListener('touchmove', this.eventMove, { passive: false });
    }
  };

  Swipeable.prototype.cleanupMouseListeners = function cleanupMouseListeners() {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  };

  Swipeable.prototype.mouseDown = function mouseDown(e) {
    if (!this.props.trackMouse || e.type !== 'mousedown') {
      return;
    }

    if (typeof this.props.onMouseDown === 'function') this.props.onMouseDown(e);

    this.setupMouseListeners();

    this.eventStart(e);
  };

  Swipeable.prototype.mouseMove = function mouseMove(e) {
    this.eventMove(e);
  };

  Swipeable.prototype.mouseUp = function mouseUp(e) {
    this.cleanupMouseListeners();
    this.eventEnd(e);
  };

  Swipeable.prototype.eventStart = function eventStart(e) {
    if (e.touches && e.touches.length > 1) return;

    var rotationAngle = this.props.rotationAngle;

    var _rotateByAngle2 = rotateByAngle(getPosition(e), rotationAngle),
        x = _rotateByAngle2.x,
        y = _rotateByAngle2.y;

    if (this.props.stopPropagation) e.stopPropagation();

    this.swipeable = { start: Date.now(), x: x, y: y, swiping: false, rotationAngle: rotationAngle };
  };

  Swipeable.prototype.eventMove = function eventMove(e) {
    var _props = this.props,
        stopPropagation = _props.stopPropagation,
        delta = _props.delta,
        onSwiping = _props.onSwiping,
        onSwiped = _props.onSwiped,
        onSwipingLeft = _props.onSwipingLeft,
        onSwipedLeft = _props.onSwipedLeft,
        onSwipingRight = _props.onSwipingRight,
        onSwipedRight = _props.onSwipedRight,
        onSwipingUp = _props.onSwipingUp,
        onSwipedUp = _props.onSwipedUp,
        onSwipingDown = _props.onSwipingDown,
        onSwipedDown = _props.onSwipedDown,
        preventDefaultTouchmoveEvent = _props.preventDefaultTouchmoveEvent;


    if (!this.swipeable.x || !this.swipeable.y || e.touches && e.touches.length > 1) {
      return;
    }

    var pos = calculatePos(e, this.swipeable);

    if (pos.absX < delta && pos.absY < delta && !this.swipeable.swiping) return;

    if (stopPropagation) e.stopPropagation();

    if (onSwiping) {
      onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
    }

    var cancelablePageSwipe = false;
    if (onSwiping || onSwiped) {
      cancelablePageSwipe = true;
    }

    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        if (onSwipingLeft || onSwipedLeft) {
          onSwipingLeft && onSwipingLeft(e, pos.absX);
          cancelablePageSwipe = true;
        }
      } else if (onSwipingRight || onSwipedRight) {
        onSwipingRight && onSwipingRight(e, pos.absX);
        cancelablePageSwipe = true;
      }
    } else if (pos.deltaY > 0) {
      if (onSwipingUp || onSwipedUp) {
        onSwipingUp && onSwipingUp(e, pos.absY);
        cancelablePageSwipe = true;
      }
    } else if (onSwipingDown || onSwipedDown) {
      onSwipingDown && onSwipingDown(e, pos.absY);
      cancelablePageSwipe = true;
    }

    this.swipeable.swiping = true;

    if (cancelablePageSwipe && preventDefaultTouchmoveEvent) e.preventDefault();
  };

  Swipeable.prototype.eventEnd = function eventEnd(e) {
    var _props2 = this.props,
        stopPropagation = _props2.stopPropagation,
        flickThreshold = _props2.flickThreshold,
        onSwiped = _props2.onSwiped,
        onSwipedLeft = _props2.onSwipedLeft,
        onSwipedRight = _props2.onSwipedRight,
        onSwipedUp = _props2.onSwipedUp,
        onSwipedDown = _props2.onSwipedDown,
        onTap = _props2.onTap;


    if (this.swipeable.swiping) {
      var pos = calculatePos(e, this.swipeable);

      if (stopPropagation) e.stopPropagation();

      var isFlick = pos.velocity > flickThreshold;

      onSwiped && onSwiped(e, pos.deltaX, pos.deltaY, isFlick, pos.velocity);

      if (pos.absX > pos.absY) {
        if (pos.deltaX > 0) {
          onSwipedLeft && onSwipedLeft(e, pos.deltaX, isFlick);
        } else {
          onSwipedRight && onSwipedRight(e, pos.deltaX, isFlick);
        }
      } else if (pos.deltaY > 0) {
        onSwipedUp && onSwipedUp(e, pos.deltaY, isFlick);
      } else {
        onSwipedDown && onSwipedDown(e, pos.deltaY, isFlick);
      }
    } else {
      onTap && onTap(e);
    }

    this.swipeable = getInitialState();
  };

  Swipeable.prototype.elementRef = function elementRef(element) {
    this.element = element;
    this.props.innerRef && this.props.innerRef(element);
  };

  Swipeable.prototype.render = function render() {
    var newProps = _extends({}, this.props);
    if (!this.props.disabled) {
      newProps.onTouchStart = this.eventStart;

      if (!this.props.preventDefaultTouchmoveEvent || !this.hasPassiveSupport) {
        newProps.onTouchMove = this.eventMove;
      }

      newProps.onTouchEnd = this.eventEnd;
      newProps.onMouseDown = this.mouseDown;
    }

    newProps.ref = this.elementRef;

    delete newProps.onSwiped;
    delete newProps.onSwiping;
    delete newProps.onSwipingUp;
    delete newProps.onSwipingRight;
    delete newProps.onSwipingDown;
    delete newProps.onSwipingLeft;
    delete newProps.onSwipedUp;
    delete newProps.onSwipedRight;
    delete newProps.onSwipedDown;
    delete newProps.onSwipedLeft;
    delete newProps.onTap;
    delete newProps.flickThreshold;
    delete newProps.delta;
    delete newProps.preventDefaultTouchmoveEvent;
    delete newProps.stopPropagation;
    delete newProps.nodeName;
    delete newProps.children;
    delete newProps.trackMouse;
    delete newProps.disabled;
    delete newProps.innerRef;
    delete newProps.rotationAngle;

    return React.createElement(this.props.nodeName, newProps, this.props.children);
  };

  return Swipeable;
}(React.Component);

Swipeable.propTypes = {
  onSwiped: PropTypes.func,
  onSwiping: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  onSwipedUp: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedDown: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onTap: PropTypes.func,
  flickThreshold: PropTypes.number,
  delta: PropTypes.number,
  preventDefaultTouchmoveEvent: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  nodeName: PropTypes.string,
  trackMouse: PropTypes.bool,
  disabled: PropTypes.bool,
  innerRef: PropTypes.func,
  children: PropTypes.node,
  rotationAngle: PropTypes.number
};

Swipeable.defaultProps = {
  flickThreshold: 0.6,
  delta: 10,
  preventDefaultTouchmoveEvent: false,
  stopPropagation: false,
  nodeName: 'div',
  disabled: false,
  rotationAngle: 0
};

module.exports = Swipeable;

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// adapted from https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
var detectPassiveEvents = {
  update: function update() {
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      var passive = false;
      var options = Object.defineProperty({}, 'passive', {
        get: function get() {
          passive = true;
        }
      });
      // note: have to set and remove a no-op listener instead of null
      // (which was used previously), becasue Edge v15 throws an error
      // when providing a null callback.
      // https://github.com/rafrex/detect-passive-events/pull/3
      var noop = function noop() {};
      window.addEventListener('testPassiveEventSupport', noop, options);
      window.removeEventListener('testPassiveEventSupport', noop, options);
      detectPassiveEvents.hasSupport = passive;
    }
  }
};

detectPassiveEvents.update();
exports.default = detectPassiveEvents;

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(213)))

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(213)))

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(213)))

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Labels = window.TreeSnap.metaLabels;

/* harmony default export */ __webpack_exports__["a"] = (Labels);

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__subcomponents_AmericanChestnutFilters__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subcomponents_AshFilters__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__subcomponents_HemlockFilters__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__subcomponents_AmericanElmFilters__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__subcomponents_WhiteOakFilters__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__subcomponents_FloridaTorreyaFilters__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__subcomponents_EasternLarchFilters__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__subcomponents_OtherFilters__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__helpers_User__ = __webpack_require__(33);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var AdvancedFiltersModal = function (_Component) {
  _inherits(AdvancedFiltersModal, _Component);

  function AdvancedFiltersModal(props) {
    _classCallCheck(this, AdvancedFiltersModal);

    var _this = _possibleConstructorReturn(this, (AdvancedFiltersModal.__proto__ || Object.getPrototypeOf(AdvancedFiltersModal)).call(this, props));

    _this.state = {
      categories: [],
      selectedCategories: [],
      city: '',
      state: '',
      county: '',
      filterName: '',
      americanChestnut: {},
      ash: {},
      hemlock: {},
      americanElm: {},
      whiteOak: {},
      floridaTorreya: {},
      easternLarch: {},
      other: {},
      resultsCount: 0,
      loading: false,
      errors: {}
    };
    return _this;
  }

  _createClass(AdvancedFiltersModal, [{
    key: '_resetForm',
    value: function _resetForm() {
      this.setState({
        selectedCategories: [],
        city: '',
        county: '',
        state: '',
        filterName: '',
        resultsCount: 0
      });
      this.refs.speciesButtonList.reset();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      axios.get('/web/observations/categories').then(function (response) {
        _this2.setState({
          categories: response.data.data
          //selectedCategories: response.data.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this._resetForm();

      this.props.onCloseRequest();
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      var _this3 = this;

      e.preventDefault();

      this.setState({ loading: true });
      var params = {
        name: this.state.filterName,
        categories: this.state.selectedCategories,
        ash: this.state.ash,
        americanChestnut: this.state.americanChestnut,
        hemlock: this.state.hemlock,
        americanElm: this.state.americanElm,
        whiteOak: this.state.whiteOak,
        floridaTorreya: this.state.floridaTorreya,
        easternLarch: this.state.easternLarch,
        other: this.state.other,
        address: {
          city: this.state.city,
          county: this.state.county,
          state: this.state.state
        },
        map: this.props.map
      };

      var url = '/web/filters';
      if (this.props.withObservations) {
        url += '/observations';
      }

      axios.post(url, params).then(function (_ref) {
        var data = _ref.data;

        _this3.setState({
          loading: false,
          errors: {}
        });

        _this3.props.onCreate({
          params: params,
          data: data.data
        });

        _this3.props.onStateChange(_.clone(_this3.state));

        _this3._resetForm();
      }).catch(function (error) {
        var response = error.response;

        if (response && response.status === 422) {
          _this3.setState({ errors: response.data });
          document.getElementById('filters-card-body').scrollTop = 0;
        }

        _this3.setState({ loading: false });
      });
    }
  }, {
    key: 'count',
    value: function count(changed) {
      var _this4 = this;

      var key = Object.keys(changed)[0];
      var filters = Object.assign({}, this.state, _defineProperty({}, key, changed[key]));

      this.setState(_defineProperty({
        loading: true
      }, key, changed[key]));

      axios.post('/web/filter/count', {
        categories: filters.selectedCategories,
        ash: filters.ash,
        americanChestnut: filters.americanChestnut,
        hemlock: filters.hemlock,
        americanElm: filters.americanElm,
        whiteOak: filters.whiteOak,
        other: filters.other,
        floridaTorreya: filters.floridaTorreya,
        easternLarch: filters.easternLarch,
        address: {
          city: filters.city,
          county: filters.county,
          state: filters.state
        }
      }).then(function (response) {
        _this4.setState({
          loading: false,
          resultsCount: response.data.data.count
        });
      }).catch(function (error) {
        console.log(error.response);
        _this4.setState({ loading: false });
      });
    }
  }, {
    key: 'renderAmericanChestnutFilters',
    value: function renderAmericanChestnutFilters() {
      var _this5 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'American Chestnut Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__subcomponents_AmericanChestnutFilters__["a" /* default */], { onChange: function onChange(americanChestnut) {
              return _this5.count({ americanChestnut: americanChestnut });
            } })
        )
      );
    }
  }, {
    key: 'renderAmericanElmFilters',
    value: function renderAmericanElmFilters() {
      var _this6 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'American Elm Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__subcomponents_AmericanElmFilters__["a" /* default */], { onChange: function onChange(americanElm) {
              return _this6.count({ americanElm: americanElm });
            } })
        )
      );
    }
  }, {
    key: 'renderWhiteOakFilters',
    value: function renderWhiteOakFilters() {
      var _this7 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'White Oak Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__subcomponents_WhiteOakFilters__["a" /* default */], { onChange: function onChange(whiteOak) {
              return _this7.count({ whiteOak: whiteOak });
            } })
        )
      );
    }
  }, {
    key: 'renderAshFilters',
    value: function renderAshFilters() {
      var _this8 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'Ash Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__subcomponents_AshFilters__["a" /* default */], { onChange: function onChange(ash) {
              return _this8.count({ ash: ash });
            } })
        )
      );
    }
  }, {
    key: 'renderHemlockFilters',
    value: function renderHemlockFilters() {
      var _this9 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'Hemlock Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__subcomponents_HemlockFilters__["a" /* default */], { onChange: function onChange(hemlock) {
              return _this9.count({ hemlock: hemlock });
            } })
        )
      );
    }
  }, {
    key: 'renderFloridaTorreyaFilters',
    value: function renderFloridaTorreyaFilters() {
      var _this10 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'Florida Torreya Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__subcomponents_FloridaTorreyaFilters__["a" /* default */], { onChange: function onChange(floridaTorreya) {
              return _this10.count({ floridaTorreya: floridaTorreya });
            } })
        )
      );
    }
  }, {
    key: 'renderEasternLarchFilters',
    value: function renderEasternLarchFilters() {
      var _this11 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'Eastern Larch Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__subcomponents_EasternLarchFilters__["a" /* default */], { onChange: function onChange(easternLarch) {
              return _this11.count({ easternLarch: easternLarch });
            } })
        )
      );
    }
  }, {
    key: 'renderOtherFilters',
    value: function renderOtherFilters() {
      var _this12 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'column is-12' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          { className: 'title is-4 mb-0' },
          'Other Trees Filters (Optional)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bordered' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__subcomponents_OtherFilters__["a" /* default */], { onChange: function onChange(other) {
              return _this12.count({ other: other });
            } })
        )
      );
    }
  }, {
    key: 'renderForm',
    value: function renderForm() {
      var _this13 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_11__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-12' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Filter Name'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'input',
                placeholder: 'Optional: label your filter',
                value: this.state.filterName,
                onChange: function onChange(_ref2) {
                  var target = _ref2.target;
                  return _this13.setState({ filterName: target.value });
                } })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'help' },
              'You can save your filter settings to easily reapply later or share with others.'
            )
          )
        ) : null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Species'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'mb-1' },
              'Begin by selecting the species you are interested in.'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { ref: 'speciesButtonList',
              list: this.state.categories,
              onChange: function onChange(selectedCategories) {
                return _this13.count({ selectedCategories: selectedCategories });
              }
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'columns mb-none' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column is-6' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field mb-none' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'label',
                  { className: 'label' },
                  'City'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'control' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                    className: 'input',
                    placeholder: 'E.g, Knoxville',
                    value: this.state.city,
                    onChange: function onChange(_ref3) {
                      var target = _ref3.target;
                      return _this13.count({ city: target.value });
                    } })
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'column is-6' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field mb-none' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'label',
                  { className: 'label' },
                  'County'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'control' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                    className: 'input',
                    placeholder: 'E.g, Knox County',
                    value: this.state.county,
                    onChange: function onChange(_ref4) {
                      var target = _ref4.target;
                      return _this13.count({ county: target.value });
                    } })
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'State'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'input',
                placeholder: 'E.g, Tennessee',
                value: this.state.state,
                onChange: function onChange(_ref5) {
                  var target = _ref5.target;
                  return _this13.count({ state: target.value });
                } })
            )
          )
        ),
        this.state.selectedCategories.map(function (label, index) {
          var key = 'render' + label.replace(' ', '') + 'Filters';
          if (typeof _this13[key] === 'function') {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { style: { width: '100%' }, key: index },
              _this13[key]()
            );
          }
          return null;
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'column is-6' }),
        __WEBPACK_IMPORTED_MODULE_11__helpers_User__["a" /* default */].authenticated() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-12' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { className: 'label checkbox' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', className: 'mr-0', defaultChecked: false }),
                'Notify me via email if new observations fitting this criteria get submitted'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: 'help mr-1' },
                'Maximum of 3 emails per week.'
              )
            )
          )
        ) : null
      );
    }
  }, {
    key: 'renderErrors',
    value: function renderErrors() {
      var keys = Object.keys(this.state.errors);
      if (keys.length === 0) {
        return;
      }

      var errors = this.state.errors;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'alert is-danger' },
        keys.map(function (key) {
          return errors[key].map(function (error, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { key: index },
              error
            );
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.visible) {
        return null;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'modal is-active' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'modal-background', onClick: this.close.bind(this) }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'modal-card modal-card-lg' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'header',
            { className: 'modal-card-head' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'modal-card-title' },
              'Advanced Filters'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', { type: 'button', className: 'delete', onClick: this.close.bind(this) })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'section',
            { className: 'modal-card-body', id: 'filters-card-body' },
            this.renderErrors(),
            this.renderForm()
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'footer',
            { className: 'modal-card-foot flex-space-between' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { type: 'button',
                className: 'button is-success' + (this.state.loading ? ' is-loading' : ''),
                disabled: this.state.loading,
                onClick: this.submit.bind(this) },
              'Apply'
            ),
            this.props.showCount ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              null,
              'Found ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'b',
                null,
                this.state.resultsCount || 0
              ),
              ' observations that fit your criteria'
            ) : null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { type: 'button',
                className: 'button',
                onClick: this.close.bind(this) },
              'Cancel'
            )
          )
        )
      );
    }
  }, {
    key: 'reapplyState',
    value: function reapplyState(state) {
      this.setState(state);
      if (state.selectedCategories) {
        this.refs.speciesButtonList.setSelected(state.selectedCategories);
      }
    }
  }]);

  return AdvancedFiltersModal;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (AdvancedFiltersModal);


AdvancedFiltersModal.propTypes = {
  visible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  onCloseRequest: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onCreate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  map: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  withObservations: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onStateChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  showCount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

AdvancedFiltersModal.defaultProps = {
  map: false,
  withObservations: true,
  showCount: false,
  onStateChange: function onStateChange() {}
};

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var AmericanChestnutFilters = function (_Component) {
  _inherits(AmericanChestnutFilters, _Component);

  function AmericanChestnutFilters(props) {
    _classCallCheck(this, AmericanChestnutFilters);

    var _this = _possibleConstructorReturn(this, (AmericanChestnutFilters.__proto__ || Object.getPrototypeOf(AmericanChestnutFilters)).call(this, props));

    _this.state = {
      burrs: [],
      catkins: [],
      chestnutBlight: [],
      crownHealth: [],
      diameterNumericMin: '',
      diameterNumericMax: '',
      heightNumericMin: '',
      heightNumericMax: ''
    };
    return _this;
  }

  _createClass(AmericanChestnutFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Nuts/Burrs'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['None', 'Few', 'Many', 'Unknown'],
              onChange: function onChange(burrs) {
                return _this2._update('burrs', burrs);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Catkins'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['Present', 'Absent', 'Unknown'],
              onChange: function onChange(catkins) {
                return _this2._update('catkins', catkins);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Chestnut Blight'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Cankers and cracked bark', 'Tan to orange-colored patches or pustules on bark', 'Evidence of old dead trunk', 'Stump sprouting'],
              onChange: function onChange(chestnutBlight) {
                return _this2._update('chestnutBlight', chestnutBlight);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Crown Health'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['1 - Healthy', '2 - Thinning', '3 - Some dead branches (less than 50%)', '4 - Many dead branches (more than 50%)', '5 - Completely dead', 'I\'m not sure'],
              onChange: function onChange(crownHealth) {
                return _this2._update('crownHealth', crownHealth);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Height (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('feet'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.heightNumericMin,
                      onChange: function onChange(_ref3) {
                        var target = _ref3.target;
                        return _this2._update('heightNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.heightNumericMax,
                      onChange: function onChange(_ref4) {
                        var target = _ref4.target;
                        return _this2._update('heightNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AmericanChestnutFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (AmericanChestnutFilters);


AmericanChestnutFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var AshFilters = function (_Component) {
  _inherits(AshFilters, _Component);

  function AshFilters(props) {
    _classCallCheck(this, AshFilters);

    var _this = _possibleConstructorReturn(this, (AshFilters.__proto__ || Object.getPrototypeOf(AshFilters)).call(this, props));

    _this.state = {
      species: [],
      locationCharacteristics: [],
      seedsBinary: [],
      flowersBinary: [],
      emeraldAshBorer: [],
      nearbyTrees: [],
      crownHealth: [],
      diameterNumericMin: '',
      diameterNumericMax: ''
    };
    return _this;
  }

  _createClass(AshFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Ash Species'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['White Ash', 'Green Ash', 'Blue Ash', 'Black Ash', 'Uncertain'],
              onChange: function onChange(species) {
                return _this2._update('species', species);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Habitat'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['Forest', 'Wetland', 'Field', 'Roadside, urban, suburban, or park'],
              onChange: function onChange(locationCharacteristics) {
                return _this2._update('locationCharacteristics', locationCharacteristics);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Seeds Present'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Yes', 'No'],
              onChange: function onChange(seedsBinary) {
                return _this2._update('seedsBinary', seedsBinary);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Flowers Present'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Yes', 'No'],
              onChange: function onChange(flowersBinary) {
                return _this2._update('flowersBinary', flowersBinary);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Ash Borer'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['D-shaped adult exit holes', 'Bark coming off with tunneling underneath', 'Emerald ash borer beetles/larvae', 'Stump sprouting'],
              onChange: function onChange(emeraldAshBorer) {
                return _this2._update('emeraldAshBorer', emeraldAshBorer);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Trees Nearby'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Dead and/or dying', 'Healthy and large', 'Healthy and small', 'No trees of this species nearby', 'Not sure'],
              onChange: function onChange(nearbyTrees) {
                return _this2._update('nearbyTrees', nearbyTrees);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Crown Health'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['1 - Healthy', '2 - Thinning', '3 - Some dead branches (less than 50%)', '4 - Many dead branches (more than 50%)', '5 - Completely dead', 'I\'m not sure'],
              onChange: function onChange(crownHealth) {
                return _this2._update('crownHealth', crownHealth);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AshFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (AshFilters);


AshFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HemlockFilters = function (_Component) {
  _inherits(HemlockFilters, _Component);

  function HemlockFilters(props) {
    _classCallCheck(this, HemlockFilters);

    var _this = _possibleConstructorReturn(this, (HemlockFilters.__proto__ || Object.getPrototypeOf(HemlockFilters)).call(this, props));

    _this.state = {
      woollyAdesCoverage: [],
      cones: [],
      crownClassification: [],
      locationCharacteristics: [],
      nearbyTrees: [],
      crownHealth: [],
      hemlockSpecies: [],
      diameterNumericMin: '',
      diameterNumericMax: ''
    };
    return _this;
  }

  _createClass(HemlockFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Species'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Eastern hemlock (Tsuga canadensis)', 'Carolina hemlock (Tsuga caroliniana)', 'Other hemlock species', 'I\'m not sure'],
              onChange: function onChange(hemlockSpecies) {
                return _this2._update('hemlockSpecies', hemlockSpecies);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Woolly Adelgids'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['0%', '1-24%', '25-49%', '50-74%', '75-100%'],
              onChange: function onChange(woollyAdesCoverage) {
                return _this2._update('woollyAdesCoverage', woollyAdesCoverage);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Cones'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['Yes', 'No'],
              onChange: function onChange(cones) {
                return _this2._update('cones', cones);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Crown Classification'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Dominant. This tree\'s crown extends above others in the area.', 'Codominant. This tree\'s crown is level with or slightly below other nearby trees.', 'Overtopped. This tree\'s crown is entirely below other trees nearby.', 'Not applicable (Tree is isolated)', 'I\'m not sure.'],
              onChange: function onChange(crownClassification) {
                return _this2._update('crownClassification', crownClassification);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Crown Health'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['1 - Healthy', '2 - Thinning', '3 - Some dead branches (less than 50%)', '4 - Many dead branches (more than 50%)', '5 - Completely dead', 'I\'m not sure'],
              onChange: function onChange(crownHealth) {
                return _this2._update('crownHealth', crownHealth);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Habitat'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Forest', 'Wetland', 'Field', 'Roadside, urban, suburban, or park'],
              onChange: function onChange(locationCharacteristics) {
                return _this2._update('locationCharacteristics', locationCharacteristics);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Trees Nearby'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Dead and/or dying', 'Healthy and large', 'Healthy and small', 'No trees of this species nearby', 'Not sure'],
              onChange: function onChange(nearbyTrees) {
                return _this2._update('nearbyTrees', nearbyTrees);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return HemlockFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (HemlockFilters);


HemlockFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var AmericanElmFilters = function (_Component) {
  _inherits(AmericanElmFilters, _Component);

  function AmericanElmFilters(props) {
    _classCallCheck(this, AmericanElmFilters);

    var _this = _possibleConstructorReturn(this, (AmericanElmFilters.__proto__ || Object.getPrototypeOf(AmericanElmFilters)).call(this, props));

    _this.state = {
      diameterNumericMin: '',
      diameterNumericMax: '',
      crownHealth: [],
      locationCharacteristics: [],
      nearbyTrees: [],
      seedsBinary: [],
      flowersBinary: []
    };
    return _this;
  }

  _createClass(AmericanElmFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Crown Health'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['1 - Healthy', '2 - Thinning', '3 - Some dead branches (less than 50%)', '4 - Many dead branches (more than 50%)', '5 - Completely dead', 'I\'m not sure'],
              onChange: function onChange(crownHealth) {
                return _this2._update('crownHealth', crownHealth);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Habitat'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Forest', 'Wetland', 'Field', 'Roadside, urban, suburban, or park'],
              onChange: function onChange(locationCharacteristics) {
                return _this2._update('locationCharacteristics', locationCharacteristics);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Trees Nearby'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Dead and/or dying', 'Healthy and large', 'Healthy and small', 'No trees of this species nearby', 'Not sure'],
              onChange: function onChange(nearbyTrees) {
                return _this2._update('nearbyTrees', nearbyTrees);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AmericanElmFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (AmericanElmFilters);


AmericanElmFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var WhiteOakFilters = function (_Component) {
  _inherits(WhiteOakFilters, _Component);

  function WhiteOakFilters(props) {
    _classCallCheck(this, WhiteOakFilters);

    var _this = _possibleConstructorReturn(this, (WhiteOakFilters.__proto__ || Object.getPrototypeOf(WhiteOakFilters)).call(this, props));

    _this.state = {
      acorns: [],
      heightFirstBranchMin: '',
      heightFirstBranchMax: '',
      oakHealthProblems: [],
      crownHealth: [],
      diameterNumericMin: '',
      diameterNumericMax: ''
    };
    return _this;
  }

  _createClass(WhiteOakFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Crown Health'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['1 - Healthy', '2 - Thinning', '3 - Some dead branches (less than 50%)', '4 - Many dead branches (more than 50%)', '5 - Completely dead', 'I\'m not sure'],
              onChange: function onChange(crownHealth) {
                return _this2._update('crownHealth', crownHealth);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Health Problems'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Dieback in canopy', 'Defoliation', 'Cankers', 'Bark damage', 'Signs of rot at base', 'Other'],
              onChange: function onChange(oakHealthProblems) {
                return _this2._update('oakHealthProblems', oakHealthProblems);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Acorns'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['None', 'Some', 'Lots', 'I\'m not sure'],
              onChange: function onChange(acorns) {
                return _this2._update('acorns', acorns);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Height of First Branch (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('feet'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.heightFirstBranchMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('heightFirstBranchMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.heightFirstBranchMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('heightFirstBranchMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref3) {
                        var target = _ref3.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref4) {
                        var target = _ref4.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return WhiteOakFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (WhiteOakFilters);


WhiteOakFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HemlockFilters = function (_Component) {
  _inherits(HemlockFilters, _Component);

  function HemlockFilters(props) {
    _classCallCheck(this, HemlockFilters);

    var _this = _possibleConstructorReturn(this, (HemlockFilters.__proto__ || Object.getPrototypeOf(HemlockFilters)).call(this, props));

    _this.state = {
      heightNumericMin: '',
      heightNumericMax: '',
      diameterNumericMin: '',
      diameterNumericMax: '',
      numberRootSproutsMin: '',
      numberRootSproutsMax: '',
      seedsBinary: [],
      conesMaleFemale: [],
      deerRub: [],
      torreyaFungalBlight: []
    };
    return _this;
  }

  _createClass(HemlockFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Seeds'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['Yes', 'No', 'I\'m not sure'],
              onChange: function onChange(seedsBinary) {
                return _this2._update('seedsBinary', seedsBinary);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Deer Rub'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], { list: ['Present', 'Absent', 'Not sure'],
              onChange: function onChange(deerRub) {
                return _this2._update('deerRub', deerRub);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Cones'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Absent', 'Male present', 'Female present', 'Not sure'],
              onChange: function onChange(conesMaleFemale) {
                return _this2._update('conesMaleFemale', conesMaleFemale);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Fungal Blight'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Present', 'Absent', 'Not sure'],
              onChange: function onChange(torreyaFungalBlight) {
                return _this2._update('torreyaFungalBlight', torreyaFungalBlight);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Height (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('feet'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.heightNumericMin,
                      onChange: function onChange(_ref3) {
                        var target = _ref3.target;
                        return _this2._update('heightNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.heightNumericMax,
                      onChange: function onChange(_ref4) {
                        var target = _ref4.target;
                        return _this2._update('heightNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Number of Root Sprouts'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.numberRootSproutsMin,
                      onChange: function onChange(_ref5) {
                        var target = _ref5.target;
                        return _this2._update('numberRootSproutsMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.numberRootSproutsMax,
                      onChange: function onChange(_ref6) {
                        var target = _ref6.target;
                        return _this2._update('numberRootSproutsMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return HemlockFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (HemlockFilters);


HemlockFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonList__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__ = __webpack_require__(272);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HemlockFilters = function (_Component) {
  _inherits(HemlockFilters, _Component);

  function HemlockFilters(props) {
    _classCallCheck(this, HemlockFilters);

    var _this = _possibleConstructorReturn(this, (HemlockFilters.__proto__ || Object.getPrototypeOf(HemlockFilters)).call(this, props));

    _this.state = {
      diameterNumericMin: '',
      diameterNumericMax: '',
      needleColor: [],
      needleAmount: []
    };
    return _this;
  }

  _createClass(HemlockFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Needles Color'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Green', 'Green Blue', 'Green Yellow', 'Golden Yellow'],
              onChange: function onChange(needlesColor) {
                return _this2._update('needlesColor', needlesColor);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Amount of Needles'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ButtonList__["a" /* default */], {
              list: ['Full', 'Falling', 'Sparse', 'Bare'],
              onChange: function onChange(needleAmount) {
                return _this2._update('needleAmount', needleAmount);
              } })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Diameter (',
              __WEBPACK_IMPORTED_MODULE_3__helpers_Utils__["a" /* default */].unit('inches'),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'field is-horizontal' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'field-body' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Min.',
                      value: this.state.diameterNumericMin,
                      onChange: function onChange(_ref) {
                        var target = _ref.target;
                        return _this2._update('diameterNumericMin', target.value);
                      } })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'field' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'control' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number',
                      className: 'input',
                      placeholder: 'Max.',
                      value: this.state.diameterNumericMax,
                      onChange: function onChange(_ref2) {
                        var target = _ref2.target;
                        return _this2._update('diameterNumericMax', target.value);
                      } })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return HemlockFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (HemlockFilters);


HemlockFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var OtherFilters = function (_Component) {
  _inherits(OtherFilters, _Component);

  function OtherFilters(props) {
    _classCallCheck(this, OtherFilters);

    var _this = _possibleConstructorReturn(this, (OtherFilters.__proto__ || Object.getPrototypeOf(OtherFilters)).call(this, props));

    _this.state = {
      otherLabel: ''
    };
    return _this;
  }

  _createClass(OtherFilters, [{
    key: '_update',
    value: function _update(key, value) {
      this.setState(_defineProperty({}, key, value));

      this.props.onChange(Object.assign({}, this.state, _defineProperty({}, key, value)));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'columns is-multiline' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'column is-6' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'field' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { className: 'label' },
              'Tree Species'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'control' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { value: this.state.otherLabel,
                className: 'input',
                onChange: function onChange(label) {
                  return _this2._update('otherLabel', label);
                },
                placeholder: 'E.g, Silver Maple' })
            )
          )
        )
      );
    }
  }]);

  return OtherFilters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (OtherFilters);


OtherFilters.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
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

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
  function Filters() {
    _classCallCheck(this, Filters);
  }

  _createClass(Filters, [{
    key: "_flatten",

    /**
     * Converts collections to array of IDs.
     *
     * @param {Array} collections
     * @private
     */
    value: function _flatten(collections) {
      return collections.map(function (collection) {
        return parseInt(collection.id);
      });
    }

    /**
     * Check if string a contains string b.
     *
     * @param {String} a
     * @param {String} b
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_contains",
    value: function _contains(a, b) {
      return a.trim().toLowerCase().indexOf(b.trim()) !== -1;
    }
  }]);

  return Filters;
}();

/* harmony default export */ __webpack_exports__["a"] = (Filters);

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,n){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):n("undefined"!=typeof exports?exports:e.dragscroll={})}(this,function(e){var n,t,o=window,l=document,c="mousemove",r="mouseup",i="mousedown",m="EventListener",d="add"+m,s="remove"+m,f=[],u=function(e,m){for(e=0;e<f.length;)m=f[e++],m=m.container||m,m[s](i,m.md,0),o[s](r,m.mu,0),o[s](c,m.mm,0);for(f=[].slice.call(l.getElementsByClassName("dragscroll")),e=0;e<f.length;)!function(e,m,s,f,u,a){(a=e.container||e)[d](i,a.md=function(n){e.hasAttribute("nochilddrag")&&l.elementFromPoint(n.pageX,n.pageY)!=a||(f=1,m=n.clientX,s=n.clientY,n.preventDefault())},0),o[d](r,a.mu=function(){f=0},0),o[d](c,a.mm=function(o){f&&((u=e.scroller||e).scrollLeft-=n=-m+(m=o.clientX),u.scrollTop-=t=-s+(s=o.clientY),e==l.body&&((u=l.documentElement).scrollLeft-=n,u.scrollTop-=t))},0)}(f[e++])};"complete"==l.readyState?u():o[d]("load",u,0),e.reset=u});

/***/ }),

/***/ 384:
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




var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'sidebar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'sidebar-content-container flexbox flex-column flex-space-between' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { className: 'close', onClick: this.props.onCloseRequest },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-arrow-left' })
          ),
          this.props.children
        )
      );
    }
  }]);

  return Sidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Sidebar);


Sidebar.propTypes = {
  onCloseRequest: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

Sidebar.defaultProps = {
  onCloseRequest: function onCloseRequest() {}
};

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Copyright = function (_Component) {
  _inherits(Copyright, _Component);

  function Copyright() {
    _classCallCheck(this, Copyright);

    return _possibleConstructorReturn(this, (Copyright.__proto__ || Object.getPrototypeOf(Copyright)).apply(this, arguments));
  }

  _createClass(Copyright, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "footer",
        { className: "copyright" },
        "Data \xA9",
        new Date().getFullYear(),
        " ",
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          { target: "_blank", href: "https://utk.edu" },
          "UTK"
        ),
        " and ",
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          { target: "_blank",
            href: "http://www.uky.edu/UKHome/" },
          "UKY"
        )
      );
    }
  }]);

  return Copyright;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Copyright);

/***/ }),

/***/ 386:
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





var Disclaimer = function (_Component) {
  _inherits(Disclaimer, _Component);

  function Disclaimer(props) {
    _classCallCheck(this, Disclaimer);

    var _this = _possibleConstructorReturn(this, (Disclaimer.__proto__ || Object.getPrototypeOf(Disclaimer)).call(this, props));

    _this.state = {
      visible: false,
      shown: false
    };

    _this.storageID = 'disclaimer_last_show_' + _this.props.id;
    _this.shouldShow = _this.determineShouldShow();
    return _this;
  }

  _createClass(Disclaimer, [{
    key: 'determineShouldShow',
    value: function determineShouldShow() {
      if (!window.localStorage) {
        // This browser doesn't support local storage :'(
        return true;
      }

      var last_shown = window.localStorage.getItem(this.storageID);

      if (last_shown) {
        if (__WEBPACK_IMPORTED_MODULE_2_moment___default()().subtract(7, 'days').isAfter(last_shown)) {
          window.localStorage.removeItem(this.storageID);
          return true;
        }

        return false;
      }

      return true;
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ visible: false });
    }
  }, {
    key: 'dontShowAgain',
    value: function dontShowAgain() {
      this.close();

      if (window.localStorage) {
        window.localStorage.setItem(this.storageID, __WEBPACK_IMPORTED_MODULE_2_moment___default()());
      }
    }
  }, {
    key: 'show',
    value: function show() {
      if (this.state.shown || !this.shouldShow) {
        return;
      }

      this.setState({ visible: true, shown: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'notification is-info floating-disclaimer' + (this.state.visible ? ' is-active' : ''),
          onClick: function onClick(e) {
            return e.stopPropagation();
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', { className: 'delete', type: 'button', onClick: this.close.bind(this) }),
        this.props.children,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'mt-0' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { className: 'button is-info is-inverted is-small',
              onClick: this.dontShowAgain.bind(this) },
            'Don\'t show me this again'
          )
        )
      );
    }
  }]);

  return Disclaimer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Disclaimer);


Disclaimer.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

Disclaimer.defaultProps = {
  id: 0
};

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Filters__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(33);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var MarkersFilter = function (_Filters) {
  _inherits(MarkersFilter, _Filters);

  function MarkersFilter(markers, categories) {
    _classCallCheck(this, MarkersFilter);

    var _this = _possibleConstructorReturn(this, (MarkersFilter.__proto__ || Object.getPrototypeOf(MarkersFilter)).call(this));

    if (typeof categories === 'undefined') {
      categories = [];
    }

    _this._searchTerm = '';
    _this._markers = markers;
    _this._categories = categories;
    _this._mapBounds = null;
    _this._collectionID = 0;
    _this._confirmed = false;
    return _this;
  }

  // ==============
  // PUBLIC METHODS
  // ==============

  _createClass(MarkersFilter, [{
    key: 'replace',
    value: function replace(markers) {
      this._markers = markers;
      return this._filter();
    }
  }, {
    key: 'setCategories',
    value: function setCategories(categories) {
      this._categories = categories;
    }
  }, {
    key: 'search',
    value: function search(term) {
      this._searchTerm = term.trim().toLowerCase();
      return this._filter();
    }
  }, {
    key: 'category',
    value: function category(categories) {
      this._categories = categories;
      return this._filter();
    }
  }, {
    key: 'bounds',
    value: function bounds(newBounds) {
      this._mapBounds = newBounds;
      return this._filter();
    }
  }, {
    key: 'collections',
    value: function collections(id) {
      this._collectionID = parseInt(id);
      return this._filter();
    }
  }, {
    key: 'confirmed',
    value: function confirmed(value) {
      this._confirmed = parseInt(value) === 1;
      return this._filter();
    }
  }, {
    key: 'newCollection',
    value: function newCollection(marker, collection) {
      if (!__WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated()) {
        return;
      }

      for (var i = 0; i < this._markers.length; i++) {
        if (marker.id === this._markers[i].id) {
          this._markers[i].collections.push(collection);
          return this._markers[i];
        }
      }
    }
  }, {
    key: 'newFlag',
    value: function newFlag(marker, flag) {
      if (!__WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated()) {
        return;
      }

      for (var i = 0; i < this._markers.length; i++) {
        if (marker.id === this._markers[i].id) {
          this._markers[i].flags.push(flag);
          return this._markers[i];
        }
      }
    }
  }, {
    key: 'removeCollection',
    value: function removeCollection(marker, collection_id) {
      if (!__WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated()) {
        return;
      }

      for (var i = 0; i < this._markers.length; i++) {
        if (marker.id === this._markers[i].id) {
          this._markers[i].collections = this._markers[i].collections.filter(function (c) {
            return collection_id !== c.id;
          });
          return this._markers[i];
        }
      }
    }
  }, {
    key: 'removeFlag',
    value: function removeFlag(marker, flag_id) {
      if (!__WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */].authenticated()) {
        return;
      }

      for (var i = 0; i < this._markers.length; i++) {
        if (marker.id === this._markers[i].id) {
          this._markers[i].flags = this._markers[i].flags.filter(function (f) {
            return parseInt(flag_id) !== f.id;
          });
          return this._markers[i];
        }
      }
    }

    /**
     * Reset bounds filter.
     */

  }, {
    key: 'resetBounds',
    value: function resetBounds() {
      this._mapBounds = null;
    }

    // ===============
    // PRIVATE METHODS
    // ===============

  }, {
    key: '_search',
    value: function _search(marker) {
      if (this._searchTerm.length === 0) {
        return true;
      }

      if (this._contains(marker.title, this._searchTerm)) {
        return true;
      }

      if (this._contains(marker.owner, this._searchTerm)) {
        return true;
      }

      return false;
    }
  }, {
    key: '_category',
    value: function _category(marker) {
      if (this._categories.length === 0) {
        return false;
      }

      return this._categories.indexOf(marker.category) !== -1;
    }
  }, {
    key: '_bounds',
    value: function _bounds(marker) {
      if (this._mapBounds === null) {
        return true;
      }

      var pos = {
        lat: marker.position.latitude,
        lng: marker.position.longitude
      };

      return this._mapBounds.contains(pos);
    }
  }, {
    key: '_collection',
    value: function _collection(marker) {
      if (this._collectionID <= 0) {
        return true;
      }

      var collections = this._flatten(marker.collections);
      return collections.indexOf(this._collectionID) !== -1;
    }
  }, {
    key: '_confirmedOnly',
    value: function _confirmedOnly(marker) {
      if (this._confirmed === false) {
        return true;
      }

      return marker.confirmations_count > 0;
    }
  }, {
    key: '_filter',
    value: function _filter() {
      var _this2 = this;

      return this._markers.filter(function (marker) {
        return _this2._bounds(marker) && _this2._search(marker) && _this2._category(marker) && _this2._collection(marker) && _this2._confirmedOnly(marker);
      });
    }
  }]);

  return MarkersFilter;
}(__WEBPACK_IMPORTED_MODULE_0__Filters__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MarkersFilter);

/***/ })

});