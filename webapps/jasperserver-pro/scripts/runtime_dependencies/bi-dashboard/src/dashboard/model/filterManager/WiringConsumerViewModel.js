define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
module.exports = Backbone.Model.extend(_.extend({}, Backbone.Validation.mixin, {
  idAttribute: undefined,
  defaults: {
    id: undefined,
    name: undefined,
    parameter: undefined,
    parameterLabel: undefined
  },
  validation: {
    id: [{
      required: true,
      msg: new i18nMessage('dashboard.filterManager.error.component.required')
    }],
    parameter: [{
      required: true,
      msg: new i18nMessage('dashboard.filterManager.error.parameter.required')
    }]
  },
  initialize: function initialize(attrs, options) {
    options || (options = {});
    this.component = options.component;
    this.on('change:id', function () {
      this.set({
        'parameter': undefined,
        'parameterLabel': undefined
      });
    }, this);
  }
}));

});