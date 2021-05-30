define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var InputControlTypeEnum = require('../enum/inputControlTypeEnum');

var queryControls = [InputControlTypeEnum.SINGLE_SELECT, InputControlTypeEnum.MULTI_SELECT, InputControlTypeEnum.SINGLE_SELECT_RADIO, InputControlTypeEnum.MULTI_SELECT_CHECKBOX];

module.exports = function (control) {
  return queryControls.indexOf(control.type) > -1;
};

});