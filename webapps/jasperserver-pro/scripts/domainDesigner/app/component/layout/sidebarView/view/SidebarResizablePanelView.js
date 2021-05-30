define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Panel = require("runtime_dependencies/js-sdk/src/common/component/panel/Panel");

var resizablePanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/resizablePanelTrait");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Panel.extend({
  constructor: function constructor(options) {
    Panel.prototype.constructor.call(this, {
      traits: [resizablePanelTrait],
      handles: function handles($el) {
        return {
          "e": $el.find(".jr-jSidebarResizer")
        };
      },
      minWidth: options.SIDEBAR_MIN_WIDTH,
      maxWidth: options.SIDEBAR_MAX_WIDTH,
      applicationCrossComponentEventBus: options.applicationCrossComponentEventBus
    });
  },
  initialize: function initialize(options) {
    this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;

    this._initEvents();

    Panel.prototype.initialize.call(this, options);
  },
  _initEvents: function _initEvents() {
    this.listenTo(this, 'resize', this._onResize);
  },
  _onResize: function _onResize(event, ui) {
    var width = ui.size.width;
    this.applicationCrossComponentEventBus.trigger('sidebar:resize', width, this.previousWidth || width);
    this.previousWidth = width;
  }
});

});