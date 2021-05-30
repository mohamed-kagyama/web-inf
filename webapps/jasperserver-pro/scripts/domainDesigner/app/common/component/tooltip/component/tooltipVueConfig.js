define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var tooltipTemplate = require("text!./template/tooltipTemplate.htm");

var typeToTypeClassEnum = require("../enum/typeToTypeClassEnum");

var placementToPlacementClassEnum = require('../enum/placementToPlacementClassEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  template: tooltipTemplate,
  props: {
    type: '',
    placement: '',
    content: {},
    target: '',
    isVisible: true,
    styleObj: {}
  },
  computed: {
    typeClass: function typeClass() {
      return typeToTypeClassEnum[this.type];
    },
    placementClass: function placementClass() {
      return placementToPlacementClassEnum[this.placement];
    },
    contentAsArray: function contentAsArray() {
      return this.content.items ? this.content.items : [this.content];
    },
    isTooltipVisible: function isTooltipVisible() {
      var hasTextAtLeastInOneContentItem = this.contentAsArray.some(function (contentItem) {
        return contentItem.text;
      });
      return this.isVisible && hasTextAtLeastInOneContentItem;
    },
    tooltipStyle: function tooltipStyle() {
      var style = _.extend({}, this.styleObj);

      if (!this.isTooltipVisible) {
        style.display = 'none';
      }

      return style;
    }
  }
};

});