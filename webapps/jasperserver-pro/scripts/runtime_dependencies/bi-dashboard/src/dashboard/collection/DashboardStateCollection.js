define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var DashboardStateModel = require('../model/DashboardStateModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  initialize: function initialize(models, options) {
    this.dashboardModel = options.model;
  },
  init: function init() {
    this.currentState = undefined;
    this.reset([]);
    this.saveState();
  },
  saveState: function saveState() {
    var currentStateIndex = this.indexOf(this.currentState);

    if (currentStateIndex + 1 < this.length) {
      var statesToRemove = this.slice(currentStateIndex + 1);
      this.remove(statesToRemove);
    }

    this.currentState = this.add(new DashboardStateModel({
      state: this.dashboardModel.toJSON(true)
    }, {
      dashboardModel: this.dashboardModel
    }));
    this.trigger('change:currentState', this.currentState, this);
  },
  setPreviousState: function setPreviousState() {
    if (this.currentState) {
      var currentStateIndex = this.indexOf(this.currentState);

      if (currentStateIndex > 0) {
        this.currentState = this.at(currentStateIndex - 1);
        this.currentState.applyState();
        this.trigger('change:currentState', this.currentState, this);
      }
    }
  },
  setFirstState: function setFirstState() {
    if (this.length > 0 && this.currentState !== this.first()) {
      this.currentState = this.first();
      this.currentState.applyState();
      this.trigger('change:currentState', this.currentState, this);
    }
  },
  setNextState: function setNextState() {
    if (this.currentState) {
      var currentStateIndex = this.indexOf(this.currentState);

      if (currentStateIndex + 1 < this.length) {
        this.currentState = this.at(currentStateIndex + 1);
        this.currentState.applyState();
        this.trigger('change:currentState', this.currentState, this);
      }
    }
  },
  setLastState: function setLastState() {
    if (this.length > 0 && this.currentState !== this.last()) {
      this.currentState = this.last();
      this.currentState.applyState();
      this.trigger('change:currentState', this.currentState, this);
    }
  },
  hasPreviousState: function hasPreviousState() {
    return this.currentState !== this.first();
  },
  hasNextState: function hasNextState() {
    return this.currentState !== this.last();
  }
});

});