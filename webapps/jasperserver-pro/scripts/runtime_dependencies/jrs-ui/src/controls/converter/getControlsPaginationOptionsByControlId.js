define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getControlPaginationOptionsByControlIdAndType = require('./getControlPaginationOptionsByControlIdAndType');

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var collectImmediateChildrenReducer = function collectImmediateChildrenReducer(acc, value) {
  if (!acc.isAddedMap[value]) {
    return _extends({}, acc, {
      isAddedMap: _objectSpread(_defineProperty({}, value, true), acc.isAddedMap),
      result: acc.result.concat(value),
      immediateChildren: acc.immediateChildren.concat(acc.controls[value].slaveDependencies || [])
    });
  }

  return acc;
};

var collectImmediateAndTransitiveChildren = function collectImmediateAndTransitiveChildren(pagedControl, controls) {
  var children = pagedControl.slaveDependencies || [];
  var immediateAndTransitiveChildrenMemo = {
    isAddedMap: {},
    result: [],
    immediateChildren: [],
    controls: controls
  };

  while (children.length > 0) {
    immediateAndTransitiveChildrenMemo.immediateChildren = [];
    immediateAndTransitiveChildrenMemo = children.reduce(collectImmediateChildrenReducer, immediateAndTransitiveChildrenMemo);
    children = immediateAndTransitiveChildrenMemo.immediateChildren;
  }

  return {
    immediateAndTransitiveChildren: immediateAndTransitiveChildrenMemo.result,
    immediateAndTransitiveChildrenMap: immediateAndTransitiveChildrenMemo.isAddedMap
  };
};

var collectImmediateAndTransitiveParents = function collectImmediateAndTransitiveParents(immediateAndTransitiveChildren, immediateAndTransitiveChildrenMap, controlId, controls) {
  var target;
  var memo = {
    isAddedMap: {},
    result: []
  };

  if (immediateAndTransitiveChildren.length > 0) {
    target = immediateAndTransitiveChildren;
  } else {
    target = [controlId];
    memo.result.push(controlId);
    memo.isAddedMap[controlId] = true;
  }

  return target.reduce(function (acc, value) {
    var parents = controls[value].masterDependencies || [];

    if (parents.length > 0) {
      return parents.reduce(function (parentAcc, parent) {
        var isAdded = immediateAndTransitiveChildrenMap[parent] || parentAcc.isAddedMap[parent];

        if (!isAdded) {
          return _extends({}, parentAcc, {
            isAddedMap: _objectSpread(_defineProperty({}, parent, true), parentAcc.isAddedMap),
            result: parentAcc.result.concat(parent)
          });
        }

        return parentAcc;
      }, acc);
    }

    return acc;
  }, memo).result;
};

module.exports = function (options) {
  var controlId = options.controlId,
      controls = options.controls;
  var pagedControl = controls[controlId];

  var _collectImmediateAndT = collectImmediateAndTransitiveChildren(pagedControl, controls),
      immediateAndTransitiveChildren = _collectImmediateAndT.immediateAndTransitiveChildren,
      immediateAndTransitiveChildrenMap = _collectImmediateAndT.immediateAndTransitiveChildrenMap;

  var immediateAndTransitiveParents = collectImmediateAndTransitiveParents(immediateAndTransitiveChildren, immediateAndTransitiveChildrenMap, controlId, controls);
  return [].concat(_toConsumableArray(immediateAndTransitiveParents.map(function (id) {
    return _objectSpread({}, getControlPaginationOptionsByControlIdAndType(id, controls[id].type, _.pick(controls[id], ['value'])));
  })), _toConsumableArray(immediateAndTransitiveChildren.map(function (id) {
    return _objectSpread({}, getControlPaginationOptionsByControlIdAndType(id, controls[id].type, _.pick(controls[id], ['select'])));
  })));
};

});