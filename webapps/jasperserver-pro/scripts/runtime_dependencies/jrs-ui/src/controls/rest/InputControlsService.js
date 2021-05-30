define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var request = require("request");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputControlsService =
/*#__PURE__*/
function () {
  function InputControlsService(options) {
    _classCallCheck(this, InputControlsService);

    _defineProperty(this, "request", void 0);

    this.request = options.request || request;
  }

  _createClass(InputControlsService, [{
    key: "getInputControlsSelectedValues",
    value: function getInputControlsSelectedValues(reportUri) {
      return this.request({
        type: 'GET',
        url: "".concat(jrsConfigs.urlContext, "/rest_v2/reports").concat(reportUri, "/inputControls/selectedValues"),
        headers: {
          Accept: 'application/json'
        }
      });
    }
  }, {
    key: "getInputControlsMetadata",
    value: function getInputControlsMetadata(reportUri) {
      return this.request({
        type: 'GET',
        url: "".concat(jrsConfigs.urlContext, "/rest_v2/reports").concat(reportUri, "/inputControls?exclude=state"),
        headers: {
          Accept: 'application/json'
        }
      });
    }
  }, {
    key: "getInputControlsValues",
    value: function getInputControlsValues(reportUri, inputControlIds) {
      return this.request({
        type: 'GET',
        url: "".concat(jrsConfigs.urlContext, "/rest_v2/reports").concat(reportUri, "/inputControls/").concat(inputControlIds.join(';'), "/values"),
        headers: {
          Accept: 'application/json'
        }
      });
    }
  }, {
    key: "getInputControlsPaginatedValues",
    value: function getInputControlsPaginatedValues(reportUri, options) {
      var controlIds = options.map(function (c) {
        return c.name;
      }).join(';');
      return this.request({
        type: 'POST',
        url: "".concat(jrsConfigs.urlContext, "/rest_v2/reports").concat(reportUri, "/inputControls/").concat(controlIds, "/values/pagination"),
        data: JSON.stringify({
          reportParameter: options
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  }]);

  return InputControlsService;
}();

module.exports = InputControlsService;

});