define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var InputControlTypeEnum;

(function (InputControlTypeEnum) {
  InputControlTypeEnum["BOOL"] = "bool";
  InputControlTypeEnum["SINGLE_VALUE_TEXT"] = "singleValueText";
  InputControlTypeEnum["SINGLE_VALUE_NUMBER"] = "singleValueNumber";
  InputControlTypeEnum["SINGLE_VALUE_DATE"] = "singleValueDate";
  InputControlTypeEnum["SINGLE_VALUE_DATE_TIME"] = "singleValueDatetime";
  InputControlTypeEnum["SINGLE_VALUE_TIME"] = "singleValueTime";
  InputControlTypeEnum["SINGLE_SELECT"] = "singleSelect";
  InputControlTypeEnum["SINGLE_SELECT_RADIO"] = "singleSelectRadio";
  InputControlTypeEnum["MULTI_SELECT"] = "multiSelect";
  InputControlTypeEnum["MULTI_SELECT_CHECKBOX"] = "multiSelectCheckbox";
})(InputControlTypeEnum || (InputControlTypeEnum = {}));

module.exports = InputControlTypeEnum;

});