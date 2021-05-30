define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var tooltipPlacements = require("../../../../../common/component/enum/placementsEnum");

var TooltipVueWrapper = require("../../../../../common/component/tooltip/directive/wrapper/TooltipVueWrapper");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function TooltipPlugin(options) {
  this.initialize(options);
}

_.extend(TooltipPlugin.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.$ = options.$ || $;
    this.tree = options.tree;
    this.getTooltipOptions = options.getTooltipOptions;

    this._initEvents();

    this._initTooltip(options);
  },
  _initTooltip: function _initTooltip(options) {
    this.tooltipVueWrapper = options.tooltipVueWrapper || new TooltipVueWrapper();
    this.$('body').append(this.tooltipVueWrapper.$mount().$el);
  },
  _initEvents: function _initEvents() {
    var self = this;
    this.listenTo(this.tree, 'list:item:mouseover', function (item, event) {
      var currentTarget = event.currentTarget,
          options = self.getTooltipOptions(item, currentTarget),
          target = options.target || currentTarget;
      var tooltipTargetIsCurrentEventTarget = target === currentTarget,
          tooltipTargetContainsEventTarget = options.bindToTarget ? self.$.contains(target, event.target) : true;
      var tooltipShouldBeVisibleByTarget = tooltipTargetIsCurrentEventTarget || tooltipTargetContainsEventTarget;

      if (options.content && tooltipShouldBeVisibleByTarget) {
        self.tooltipVueWrapper.setState({
          type: options.type,
          placement: options.placement || tooltipPlacements.BOTTOM_LEFT,
          offset: _.extend({}, {
            top: 0,
            left: 0
          }, options.offset),
          timeout: options.timeout,
          target: target,
          content: options.content
        });
      }
    });
    this.listenTo(this.tree, 'render:data', this._onRenderData);
    this.listenTo(this.tree, 'list:item:mouseout', function () {
      self.tooltipVueWrapper.resetState();
    });
  },
  _onRenderData: function _onRenderData() {
    this.tooltipVueWrapper.resetState();
  },
  remove: function remove() {
    this.tooltipVueWrapper.$destroy();
  }
});

module.exports = TooltipPlugin;

});