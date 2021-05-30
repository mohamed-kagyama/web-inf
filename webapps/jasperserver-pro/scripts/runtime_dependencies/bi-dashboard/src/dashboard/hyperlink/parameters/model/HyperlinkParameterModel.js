define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var i18n = require("bundle!DashboardBundle");

var Backbone = require('backbone');

var BackboneValidation = require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var HyperlinkParameterModel = Backbone.Model.extend({
  idAttribute: 'name',
  defaults: {
    name: '',
    value: ''
  },
  validation: {
    name: function name(value) {
      if (!$.trim(value)) {
        return i18n['dashboard.component.dialog.properties.hyperlinks.required.field'];
      }
    },
    value: function value(_value) {
      if (!$.trim(_value)) {
        return i18n['dashboard.component.dialog.properties.hyperlinks.required.field'];
      }
    }
  }
});

_.extend(HyperlinkParameterModel.prototype, BackboneValidation.mixin);

module.exports = HyperlinkParameterModel;

});