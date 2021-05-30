define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Panel = require("runtime_dependencies/js-sdk/src/common/component/panel/Panel");

var resizablePanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/resizablePanelTrait");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Panel.extend({
  constructor: function constructor(options) {
    _.bindAll(this, '_onResizePanel', '_onWindowResize');

    this.$window = options.$window || $(window);
    this.footerHeight = options.footerHeight;
    this.joinTreesSectionMinHeight = options.joinTreesSectionMinHeight;
    Panel.prototype.constructor.call(this, {
      el: options.el,
      traits: [resizablePanelTrait],
      handles: function handles($el) {
        return {
          "s": $el.find(".jr-jJoinsSectionResizer")
        };
      },
      minHeight: options.minHeight,
      maxHeight: options.maxHeight
    });
    this.on('resize', this._onResizePanel);
    this.$window.on('resize', this._onWindowResize);
  },
  remove: function remove() {
    this.off('resize', this._onResizePanel);
    this.$window.off('resize', this._onWindowResize);
    Panel.prototype.remove.apply(this, arguments);
  },
  _onResizePanel: function _onResizePanel(event, ui) {
    var viewPortHeight = this.$window.height() - this.footerHeight,
        sectionHeight = ui.size.height,
        elementOffsetTop = this.$el.offset().top;
    var sectionHeightWithOffset = elementOffsetTop + sectionHeight,
        maxSectionHeight = viewPortHeight - this.joinTreesSectionMinHeight;

    if (sectionHeightWithOffset < maxSectionHeight) {
      this.$el.css({
        'height': '',
        'flex': '0 0 ' + ui.size.height + 'px'
      });
    }
  },
  _onWindowResize: function _onWindowResize(event) {
    if (event.target === this.$window[0]) {
      this.$el.css({
        'height': '',
        'flex': ''
      });
    }
  }
});

});