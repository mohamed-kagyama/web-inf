define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var RestErrorCodesEnum;

(function (RestErrorCodesEnum) {
  RestErrorCodesEnum["OUT_OF_RANGE_ERROR"] = "error.out.of.range";
  RestErrorCodesEnum["UNEXPECTED_ERROR"] = "unexpected.error";
  RestErrorCodesEnum["SERIALIZATION_ERROR"] = "serialization.error";
})(RestErrorCodesEnum || (RestErrorCodesEnum = {}));

module.exports = RestErrorCodesEnum;

});