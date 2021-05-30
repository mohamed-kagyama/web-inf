define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputControlsDataProviderWithDataLabelHash =
/*#__PURE__*/
function () {
  function InputControlsDataProviderWithDataLabelHash(options) {
    _classCallCheck(this, InputControlsDataProviderWithDataLabelHash);

    _defineProperty(this, "inputControlsDataProvider", void 0);

    _defineProperty(this, "dataLabelHash", void 0);

    this.dataLabelHash = {};
    this.inputControlsDataProvider = options.inputControlsDataProvider;
  }

  _createClass(InputControlsDataProviderWithDataLabelHash, [{
    key: "getData",
    value: function getData(uri, options) {
      var _this = this;

      return this.inputControlsDataProvider.getData(uri, options).then(function (response) {
        var data = response.data,
            total = response.total;
        data.forEach(function (option) {
          _this.dataLabelHash[option.value] = option.label;
        });
        return {
          data: data,
          total: total
        };
      });
    }
  }, {
    key: "getLabelByValue",
    value: function getLabelByValue(value) {
      return this.dataLabelHash[value];
    }
  }]);

  return InputControlsDataProviderWithDataLabelHash;
}();

module.exports = InputControlsDataProviderWithDataLabelHash;
;

});