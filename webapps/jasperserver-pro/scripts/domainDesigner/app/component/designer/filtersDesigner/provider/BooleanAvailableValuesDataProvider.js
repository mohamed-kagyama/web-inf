define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var domainDesignerSettings = require("settings!domainSettings");

var booleanStringEquivalentEnum = require("../../../../util/designer/filters/enum/booleanStringEquivalentEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var BooleanAvailableValuesDataProvider = function BooleanAvailableValuesDataProvider(options) {
  this.initialize(options);
};

_.extend(BooleanAvailableValuesDataProvider.prototype, {
  initialize: function initialize() {
    _.bindAll(this, 'getData');
  },
  getData: function getData(options) {
    options = options || {};
    var criteria = options.criteria;
    var dfd = new $.Deferred();
    var data = [{
      label: domainDesignerSettings.nullLabel,
      value: domainDesignerSettings.nullLabel
    }, {
      label: booleanStringEquivalentEnum.TRUE,
      value: booleanStringEquivalentEnum.TRUE
    }, {
      label: booleanStringEquivalentEnum.FALSE,
      value: booleanStringEquivalentEnum.FALSE
    }];

    if (criteria) {
      data = data.filter(function (entry) {
        return entry.label.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
      });
    }

    dfd.resolve({
      data: data,
      total: data.length
    });
    return dfd;
  }
});

module.exports = BooleanAvailableValuesDataProvider;

});