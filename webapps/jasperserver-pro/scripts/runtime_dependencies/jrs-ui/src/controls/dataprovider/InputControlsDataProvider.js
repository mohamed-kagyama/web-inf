define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputControlsDataProvider =
/*#__PURE__*/
function () {
  function InputControlsDataProvider(options) {
    _classCallCheck(this, InputControlsDataProvider);

    _defineProperty(this, "inputControlsService", void 0);

    _defineProperty(this, "controlId", void 0);

    _defineProperty(this, "additionalParams", void 0);

    this.controlId = options.controlId;
    this.inputControlsService = options.inputControlsService;
    this.additionalParams = {};
  }

  _createClass(InputControlsDataProvider, [{
    key: "getData",
    value: function getData(uri, serviceOptions) {
      var _this = this;

      return this.inputControlsService.getInputControlsPaginatedValues(uri, serviceOptions).then(function (response) {
        var state = response && response.inputControlState ? response.inputControlState : [];
        var controlData = state.find(function (control) {
          return control.id === _this.controlId;
        }) || {
          id: '',
          uri: '',
          options: [],
          totalCount: '0'
        };
        var data = controlData.options.map(function (option) {
          return _objectSpread({}, option);
        });
        return {
          data: data,
          total: parseInt(controlData.totalCount, 10)
        };
      });
    }
  }]);

  return InputControlsDataProvider;
}();

module.exports = InputControlsDataProvider;
;

});