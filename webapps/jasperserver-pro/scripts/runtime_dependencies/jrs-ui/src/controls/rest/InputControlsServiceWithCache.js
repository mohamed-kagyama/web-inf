define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getCacheKey = function getCacheKey(reportUri, options) {
  var sortedOptions = _.sortBy(options, 'name');

  return sortedOptions.reduce(function (memo, option) {
    var name = option.name,
        offset = option.offset,
        limit = option.limit;
    var params = [name, offset, limit].concat(option.criteria || []).concat(option.value || []).concat(option.select || []);
    return "".concat(memo, " ").concat(JSON.stringify(params));
  }, "".concat(reportUri));
};

var InputControlsServiceWithCache =
/*#__PURE__*/
function () {
  function InputControlsServiceWithCache(options) {
    _classCallCheck(this, InputControlsServiceWithCache);

    _defineProperty(this, "inputControlsService", void 0);

    _defineProperty(this, "cache", void 0);

    this.cache = {};
    this.inputControlsService = options.inputControlsService;
  }

  _createClass(InputControlsServiceWithCache, [{
    key: "getInputControlsSelectedValues",
    value: function getInputControlsSelectedValues(reportUri) {
      return this.inputControlsService.getInputControlsSelectedValues(reportUri);
    }
  }, {
    key: "getInputControlsMetadata",
    value: function getInputControlsMetadata(reportUri) {
      return this.inputControlsService.getInputControlsMetadata(reportUri);
    }
  }, {
    key: "getInputControlsValues",
    value: function getInputControlsValues(reportUri, inputControlIds) {
      return this.inputControlsService.getInputControlsValues(reportUri, inputControlIds);
    }
  }, {
    key: "getInputControlsPaginatedValues",
    value: function getInputControlsPaginatedValues(reportUri, options) {
      var _this = this;

      var cacheKey = getCacheKey(reportUri, options);
      var cacheValue = this.cache[cacheKey];
      var dfd = $.Deferred();

      if (cacheValue) {
        dfd.resolve(cacheValue);
      } else {
        this.inputControlsService.getInputControlsPaginatedValues(reportUri, options).then(function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var response = args[0];
          _this.cache[cacheKey] = response;
          dfd.resolve(response);
        }, function () {
          dfd.reject.apply(dfd, arguments);
        });
      }

      return dfd;
    }
  }, {
    key: "setCacheValueForControlPaginatedValues",
    value: function setCacheValueForControlPaginatedValues(reportUri, options, cacheValue) {
      var cacheKey = getCacheKey(reportUri, options);
      this.cache[cacheKey] = cacheValue;
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.cache = {};
    }
  }]);

  return InputControlsServiceWithCache;
}();

module.exports = InputControlsServiceWithCache;

});