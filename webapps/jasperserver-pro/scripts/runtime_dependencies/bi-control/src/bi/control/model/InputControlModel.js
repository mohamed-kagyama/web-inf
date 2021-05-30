define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseModel = require("runtime_dependencies/js-sdk/src/common/model/BaseModel");

var InputControlStateModel = require('./InputControlStateModel');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("InputControlModel");
module.exports = BaseModel.extend({
  defaults: {
    id: undefined,
    label: undefined,
    description: undefined,
    mandatory: false,
    readOnly: false,
    type: undefined,
    uri: undefined,
    visible: false,
    masterDependencies: undefined,
    slaveDependencies: undefined,
    validationRules: undefined,
    state: undefined
  },
  initialize: function initialize() {
    BaseModel.prototype.initialize.apply(this, arguments);
    this.state = new InputControlStateModel(this.get('state') || {});
    this.state.dataType = this.get('dataType');
    this.state.validationRules = this.get('validationRules');
    this.state.mandatory = this.get('mandatory');
    this.on('change:state', _.bind(function () {
      this.state.clear({
        silent: true
      }).set(this.get('state') || {});
    }, this));
    this.on('all', localLogger.debug, localLogger);
  },
  changeState: function changeState(data) {
    this.state.changeState(data);
    this.collection.trigger('changeState', this);
  },
  getData: function getData() {
    return this.state.getData();
  }
});

});