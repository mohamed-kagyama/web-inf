define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = {
  metadataToViewModelConverter: function metadataToViewModelConverter(metadata) {
    return metadata.inputControl.map(function (control) {
      return _extends({}, control, {
        uri: control.uri.replace('repo:', '')
      });
    });
  }
};

});