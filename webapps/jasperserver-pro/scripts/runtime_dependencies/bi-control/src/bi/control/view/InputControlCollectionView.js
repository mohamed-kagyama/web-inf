define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var domReady = require('requirejs-domready');

var inputControlTypeViews = require('../enum/uiTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  className: 'jr-mForm jr',
  $icContainer: false,
  $icList: false,
  initialize: function initialize(options) {
    this.stateModel = options.stateModel;
    this.uiTypes = inputControlTypeViews;
    this.controlViews = {}; // initialize this variable to prevent errors then setContainer() function was not used
    // initialize this variable to prevent errors then setContainer() function was not used

    this.containerAttachedToDOM = new $.Deferred(); // set the relative position to the our $el element
    // set the relative position to the our $el element

    this.$el.css('position', 'relative');
    this.collection.on('reset', this._createControlViews, this);
    this.collection.on('disableICs', this._disableICs, this);
    this.collection.on('enableICs', this._enableICs, this);
  },
  _createControlViews: function _createControlViews() {
    var that = this;
    this.controlViews = {};
    that.collection.each(_.bind(that._createControlView, that));
    that.render();
  },
  // Create control and add it to controlViews but do not add to the DOM
  _createControlView: function _createControlView(control) {
    var type = control.get('type'),
        id = control.get('id');

    if (_.has(this.uiTypes, type)) {
      if (control.get('visible')) {
        this.controlViews[id] = new this.uiTypes[type]({
          model: control
        });
      }
    } else {
      throw new Error('Can not find implementation of the control type: ' + type);
    }

    return this.controlViews[id];
  },
  setContainer: function setContainer(selector) {
    var $icContainer = $(selector),
        self = this;

    if (!$icContainer.length) {
      return;
    }

    $icContainer.empty();
    this.$icContainer = $icContainer; // next, wait for the domReady event and append our $el into the container
    // next, wait for the domReady event and append our $el into the container

    this.containerAttachedToDOM = new $.Deferred();
    domReady(function () {
      self.$icContainer.html(self.$el);
      self.containerAttachedToDOM.resolve();
    });
  },
  render: function render() {
    var self = this,
        dfd = new $.Deferred();
    this.containerAttachedToDOM.done(function () {
      self.$el.empty();

      self._renderControls();

      dfd.resolve();
    });
    return dfd;
  },
  _renderControls: function _renderControls() {
    var self = this;
    this.collection.each(function (control) {
      var control = self.controlViews[control.get('id')];

      if (control) {
        self.$el.append(control.$el);
        control.trigger('attached');
      }
    });
    this.trigger('controls:rendered');
  },
  // Prevent user action on control
  disable: function disable() {
    _.pluck(this.controlViews, 'disable');
  },
  // Allow user action on control
  enable: function enable() {
    _.pluck(this.controlViews, 'enable');
  },
  _disableICs: function _disableICs(ICsToDisable) {
    var self = this;

    _.each(ICsToDisable, function (icId) {
      if (self.controlViews[icId]) {
        self.controlViews[icId].disable();
      }
    });
  },
  _enableICs: function _enableICs(ICsToEnable) {
    var self = this;

    _.each(ICsToEnable, function (icId) {
      self.controlViews[icId] && !self.controlViews[icId].model.get('readOnly') && self.controlViews[icId].enable();
    });
  },
  remove: function remove() {
    _.pluck(this.controlViews, 'remove');

    this.collection.off('reset', this._createControlViews, this);
    Backbone.View.prototype.remove.call(this);
  }
});

});