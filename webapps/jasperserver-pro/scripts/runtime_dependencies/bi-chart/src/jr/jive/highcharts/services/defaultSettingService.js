define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var Highcharts = require("highcharts");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// this import is necessary for the eval-ed function to access the Highcharts' static functions
var JRDefaultHighchartsSettingService = {
  perform: function perform(highchartsOptions, optionsArr) {
    var it = this;
    $.each(optionsArr, function (i, option) {
      if (option) {
        it.setProperty(highchartsOptions, option.prop, option.val, option.isFunction);
      }
    });
  },
  setProperty: function setProperty(options, propertyPath, propertyValue, isFunction) {
    var tokens = propertyPath.split(".");
    var obj = options;
    var idx;

    var tokenToProp = function tokenToProp(token) {
      var match = /^([a-zA-Z0-9$_]+)(?:\[(\d+)\])$/.exec(token);
      return match ? {
        name: match[1],
        position: parseInt(match[2])
      } : {
        name: token,
        position: -1
      };
    };

    var setProp = function setProp(o, prop, valueProvider) {
      var oValue = o[prop.name],
          // for existing arrays we are setting the property on the first item when no position was specified
      position = Math.max(prop.position, 0),
          valArray,
          setValue;

      if ($.isArray(oValue)) {
        setValue = oValue[position] = valueProvider(oValue[position]);
      } else if (prop.position < 0) {
        setValue = o[prop.name] = valueProvider(oValue);
      } else {
        valArray = o[prop.name] = new Array(prop.position + 1);

        if (typeof oValue != "undefined" && oValue != null) {
          //adding existing object as first array element
          valArray[0] = oValue;
        }

        setValue = valArray[position] = valueProvider(valArray[position]);
      }

      return setValue;
    };

    for (idx = 0; idx < tokens.length - 1; ++idx) {
      obj = setProp(obj, tokenToProp(tokens[idx]), function (val) {
        return typeof val == "undefined" || val == null ? {} : val;
      });
    }

    setProp(obj, tokenToProp(tokens[idx]), function () {
      /*eslint-disable-next-line no-eval*/
      return isFunction ? eval("[" + propertyValue + "][0]") : propertyValue;
    });
  }
};
module.exports = JRDefaultHighchartsSettingService;

});