define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var inputControlsToViewModelConverter = require('../converter/inputControlsToViewModelConverter');

var getControlPaginationOptionsByControlIdAndType = require('../converter/getControlPaginationOptionsByControlIdAndType');

var RestParamsEnum = require('../rest/enum/restParamsEnum');

var isQueryControl = require('../predicate/isQueryControl');

var getControlsPaginationOptionsByControlId = require('../converter/getControlsPaginationOptionsByControlId');

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPaginatedValuesOptionsForQueryControls = function getPaginatedValuesOptionsForQueryControls(structure, controlsMap, mapper, callback) {
  return structure.reduce(function (memo, control) {
    if (isQueryControl(control)) {
      var newMemo = _objectSpread({}, memo, _defineProperty({}, control.id, getControlsPaginationOptionsByControlId({
        controlId: control.id,
        controls: controlsMap
      }).map(mapper)));

      if (typeof callback !== 'undefined') {
        callback(newMemo[control.id]);
      }

      return newMemo;
    }

    return memo;
  }, {});
};

var getControlsPaginationOptionsByControlIdOnSelectionChange = function getControlsPaginationOptionsByControlIdOnSelectionChange(options) {
  var controlId = options.controlId,
      value = options.value,
      controls = options.controls,
      selection = options.selection;

  var controlsWithValueOrDefaultSelection = _.reduce(controls, function (memo, control) {
    var additionalOptions = {};

    if (control.id === controlId) {
      additionalOptions = {
        value: value.length > 0 ? value : [RestParamsEnum.NOTHING_SUBSTITUTION_VALUE]
      };
    } else {
      additionalOptions = {
        value: selection[control.id] || [],
        select: RestParamsEnum.SELECTED_VALUES
      };
    }

    return _objectSpread({}, memo, _defineProperty({}, control.id, _objectSpread({
      masterDependencies: control.masterDependencies || [],
      slaveDependencies: control.slaveDependencies || []
    }, additionalOptions)));
  }, {});

  return getControlsPaginationOptionsByControlId({
    controlId: controlId,
    controls: controlsWithValueOrDefaultSelection
  });
};

var InputControlsReportViewerService =
/*#__PURE__*/
function () {
  function InputControlsReportViewerService(options) {
    _classCallCheck(this, InputControlsReportViewerService);

    _defineProperty(this, "inputControlsService", void 0);

    _defineProperty(this, "requestedSelectionParams", void 0);

    this.inputControlsService = options.inputControlsService;
    this.requestedSelectionParams = {};
  }

  _createClass(InputControlsReportViewerService, [{
    key: "fetchInputControlsInitialState",
    value: function fetchInputControlsInitialState(uri, allRequestParameters) {
      var _this = this;

      // flow when user is setting values through uri.
      return this.inputControlsService.getInputControlsMetadata(uri).then(function (response) {
        if (response) {
          var structure = inputControlsToViewModelConverter.metadataToViewModelConverter(response);

          _this.fetchRequestParamsThroughURL(structure, allRequestParameters);

          return _this.fetchInitialInputControlsValuesByUriAndStructure(uri, structure);
        }

        return $.Deferred().resolve(response);
      });
    }
  }, {
    key: "fetchRequestParamsThroughURL",
    value: function fetchRequestParamsThroughURL(structure, allRequestParameters) {
      var _this2 = this;

      var fetchLabelOfControls = _.pluck(structure, 'id');

      var fetchKeysOfParams = _.keys(allRequestParameters);

      var getControlIdInRequestParams = _.intersection(fetchLabelOfControls, fetchKeysOfParams);

      if (getControlIdInRequestParams.length > 0) {
        getControlIdInRequestParams.forEach(function (val) {
          _this2.requestedSelectionParams[val] = allRequestParameters[val];
        });
      }
    }
  }, {
    key: "fetchInitialInputControlsValuesByUri",
    value: function fetchInitialInputControlsValuesByUri(uri, structure) {
      return this.fetchInitialInputControlsValuesByUriAndStructure(uri, structure);
    }
  }, {
    key: "fetchInputControlsOptionsBySelectionAndUri",
    value: function fetchInputControlsOptionsBySelectionAndUri(selection, uri, structure) {
      var controlsMap = structure.reduce(function (memo, control) {
        return _objectSpread({}, memo, _defineProperty({}, control.id, control));
      }, {});

      var paginationOptions = _.map(selection, function (value, controlId) {
        return getControlPaginationOptionsByControlIdAndType(controlId, controlsMap[controlId].type, {
          value: value && value.length === 0 ? [RestParamsEnum.NOTHING_SUBSTITUTION_VALUE] : selection[controlId] || []
        });
      });

      var paginationOptionsPerControl = getPaginatedValuesOptionsForQueryControls(structure, controlsMap, function (option) {
        return _objectSpread({}, option, {
          value: selection[option.name] || []
        });
      });
      return this.fetchInputControlsOptionsByPaginatedValuesOptionsAndUri({
        paginationOptions: paginationOptions,
        paginationOptionsPerControl: paginationOptionsPerControl,
        uri: uri
      }).then(function (response) {
        return $.Deferred().resolve(response, paginationOptions, paginationOptionsPerControl);
      });
    }
  }, {
    key: "fetchInputControlsValuesOnControlSelectionChange",
    value: function fetchInputControlsValuesOnControlSelectionChange(options) {
      var controlId = options.controlId,
          value = options.value,
          uri = options.uri,
          structure = options.structure,
          selection = options.selection,
          initialSelectedValues = options.initialSelectedValues;
      var valueMap = value.reduce(function (memo, el) {
        return _objectSpread({}, memo, _defineProperty({}, el, true));
      }, {});
      var controlsMap = structure.reduce(function (memo, control) {
        return _objectSpread({}, memo, _defineProperty({}, control.id, control));
      }, {});
      var paginationOptions = getControlsPaginationOptionsByControlIdOnSelectionChange({
        controlId: controlId,
        value: value,
        selection: selection,
        controls: controlsMap
      });
      var isInitialSelectionPresent = initialSelectedValues[controlId] && initialSelectedValues[controlId].every(function (option) {
        return valueMap[option.value];
      });
      return this.fetchInputControlsOptionsByPaginatedValuesOptionsAndUri({
        paginationOptions: paginationOptions,
        uri: uri
      }).then(function (response) {
        var controlsData = response.inputControlState;
        var selectionPerControl = paginationOptions.reduce(function (memo, option) {
          var isSelectedValues = option.select === RestParamsEnum.SELECTED_VALUES;

          if (isSelectedValues) {
            var values = [];

            if (isInitialSelectionPresent && initialSelectedValues[option.name]) {
              values = initialSelectedValues[option.name].map(function (sel) {
                return sel.value;
              });
            } else {
              var controlSelection = controlsData.find(function (control) {
                return control.id === option.name;
              });

              if (controlSelection) {
                var selectedOptions = controlSelection.options.find(function (op) {
                  return op.selected;
                });
                values = selectedOptions ? [selectedOptions.value] : [];
              }
            }

            return _objectSpread({}, memo, _defineProperty({}, option.name, values));
          }

          return memo;
        }, {});
        return $.Deferred().resolve(response, selectionPerControl, paginationOptions);
      });
    }
  }, {
    key: "fetchInitialInputControlsValuesByUriAndStructure",
    value: function fetchInitialInputControlsValuesByUriAndStructure(uri, structure) {
      var _this3 = this;

      var initialPaginatedValuesOptions = structure.map(function (control) {
        return getControlPaginationOptionsByControlIdAndType(control.id, control.type, _this3.requestedSelectionParams[control.id] ? {
          value: _this3.requestedSelectionParams[control.id]
        } : {
          select: RestParamsEnum.SELECTED_VALUES
        });
      });
      var initialPaginatedValuesPromise = this.inputControlsService.getInputControlsPaginatedValues(uri, initialPaginatedValuesOptions);
      var selectedValuesPromise = this.inputControlsService.getInputControlsSelectedValues(uri);
      return $.when(initialPaginatedValuesPromise, selectedValuesPromise).then(function (paginatedValuesResponse, selectedValuesResponse) {
        var _selectedValuesRespon = _slicedToArray(selectedValuesResponse, 1),
            selectedValues = _selectedValuesRespon[0];

        var paginatedValues = paginatedValuesResponse instanceof Array ? paginatedValuesResponse[0] : paginatedValuesResponse; // first priority always goes to when user has added param through URL then other.

        var selection = {};

        if (!_.isEmpty(_this3.requestedSelectionParams)) {
          selection = paginatedValues.inputControlState.reduce(function (memo, stateValue) {
            var formateStateOptions = stateValue.options ? stateValue.options.filter(function (val) {
              return val.selected;
            }).map(function (ip) {
              return _.omit(ip, 'selected');
            }) : [{
              label: stateValue.value,
              value: stateValue.value
            }];
            return _objectSpread({}, memo, _defineProperty({}, stateValue.id, formateStateOptions || []));
          }, {});
        } else {
          selection = selectedValues ? selectedValues.selectedValue.reduce(function (memo, controlSelection) {
            return _objectSpread({}, memo, _defineProperty({}, controlSelection.id, controlSelection.options || []));
          }, {}) : {};
        }

        var controlsMap = structure.reduce(function (memo, control) {
          return _objectSpread({}, memo, _defineProperty({}, control.id, _this3.requestedSelectionParams[control.id] ? _objectSpread({}, control, {
            value: _this3.requestedSelectionParams[control.id]
          }) : _objectSpread({}, control, {
            select: RestParamsEnum.SELECTED_VALUES
          })));
        }, {});
        var paginationOptionsPerControl = getPaginatedValuesOptionsForQueryControls(structure, controlsMap, function (option) {
          return _this3.requestedSelectionParams[option.name] ? _objectSpread({}, option, {
            value: _this3.requestedSelectionParams[option.name]
          }) : _objectSpread({}, option, {
            select: RestParamsEnum.SELECTED_VALUES
          });
        }, function (options) {
          _this3.inputControlsService.setCacheValueForControlPaginatedValues(uri, options, paginatedValues);
        });
        return $.Deferred().resolve({
          structure: structure,
          selection: selection,
          paginationOptionsPerControl: paginationOptionsPerControl,
          paginatedValuesResponse: paginatedValues
        });
      });
    }
  }, {
    key: "fetchInputControlsOptionsByPaginatedValuesOptionsAndUri",
    value: function fetchInputControlsOptionsByPaginatedValuesOptionsAndUri(options) {
      var _this4 = this;

      var paginationOptions = options.paginationOptions,
          _options$paginationOp = options.paginationOptionsPerControl,
          paginationOptionsPerControl = _options$paginationOp === void 0 ? {} : _options$paginationOp,
          uri = options.uri;
      this.inputControlsService.clearCache();
      return this.inputControlsService.getInputControlsPaginatedValues(uri, paginationOptions).then(function (response) {
        paginationOptions.forEach(function (controlPaginationOptions) {
          var controlId = controlPaginationOptions.name;

          if (paginationOptionsPerControl[controlId]) {
            _this4.inputControlsService.setCacheValueForControlPaginatedValues(uri, paginationOptionsPerControl[controlId], response);
          }
        });
        return response;
      });
    }
  }]);

  return InputControlsReportViewerService;
}();

module.exports = InputControlsReportViewerService;
;

});