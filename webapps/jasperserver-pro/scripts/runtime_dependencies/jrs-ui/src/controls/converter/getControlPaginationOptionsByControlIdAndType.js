define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _controlSpecificOptio;

var _ = require('underscore');

var InputControlTypeEnum = require('../enum/inputControlTypeEnum');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LIMIT = 100;

var omitLimit = function omitLimit(paginatedValuesOptions) {
  return _.omit(paginatedValuesOptions, ['limit']);
};

var controlSpecificOptionsMap = (_controlSpecificOptio = {}, _defineProperty(_controlSpecificOptio, InputControlTypeEnum.SINGLE_SELECT_RADIO, function (paginatedValuesOptions) {
  return omitLimit(paginatedValuesOptions);
}), _defineProperty(_controlSpecificOptio, InputControlTypeEnum.MULTI_SELECT_CHECKBOX, function (paginatedValuesOptions) {
  return omitLimit(paginatedValuesOptions);
}), _controlSpecificOptio);

module.exports = function (id, type) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = _objectSpread({
    name: id,
    offset: 0,
    limit: LIMIT
  }, options);

  var addControlSpecificOptions = controlSpecificOptionsMap[type];

  if (addControlSpecificOptions) {
    return addControlSpecificOptions(result);
  }

  return result;
};

});