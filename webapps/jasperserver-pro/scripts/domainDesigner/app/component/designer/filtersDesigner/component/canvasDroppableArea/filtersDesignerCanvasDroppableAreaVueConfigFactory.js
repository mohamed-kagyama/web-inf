define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/filtersDesignerCanvasDroppableAreaViewTemplate.htm");

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var lazyDroppableDirective = require("../../../../../common/vue/directive/lazyDroppableDirective");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      components: {},
      props: ['isEmptyDataStructure', 'filters', 'isActive'],
      data: function data() {
        return {
          isOver: false
        };
      },
      mixins: options.mixins || [],
      directives: {
        droppable: lazyDroppableDirective
      },
      computed: _.extend({
        isDropZoneActive: function isDropZoneActive() {
          return this.isActive && !this.isOver;
        }
      }, i18nComputed)
    };
  }
};

});