define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function defaultGetCurrentDate() {
  return new Date();
}

function getCookie(document, getCurrentDate) {
  function get(name) {
    var replacedName = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
    var regexPattern = "(?:^|; )".concat(replacedName, "=([^;]*)");
    var matches = document.cookie.match(new RegExp(regexPattern));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function set(name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var opt = _objectSpread({}, options);

    if (opt.expires && opt.expires.toUTCString) {
      opt.expires = opt.expires.toUTCString();
    } else {
      var currentDate = getCurrentDate();
      currentDate.setDate(currentDate.getDate() + 30);
      opt.expires = currentDate;
    } // eslint-disable-next-line no-param-reassign


    document.cookie = Object.keys(opt).reduce(function (cookie, key) {
      var result = "".concat(cookie, "; ").concat(key);
      var optionValue = opt[key];

      if (optionValue !== true) {
        result += "=".concat(optionValue);
      }

      return result;
    }, "".concat(name, "=").concat(encodeURIComponent(value)));
  }

  function remove(name) {
    set(name, 'null', {
      expires: new Date(1970, 0, 1)
    });
  }

  return {
    get: get,
    set: set,
    remove: remove
  };
}

exports.getCookie = getCookie;
var cookie = exports.cookie = getCookie(document, defaultGetCurrentDate);

});