define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var template = require("text!./template/filtersDesignerTemplate.htm");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var lazyDroppableDirective = require("../../../../../common/vue/directive/lazyDroppableDirective");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    return {
      template: template,
      components: {
        canvasDroppableArea: options.canvasDroppableArea,
        complexFilter: options.complexFilter,
        draftFilter: options.draftFilter,
        filterExpression: options.filterExpression,
        virtualData: options.virtualData,
        filtersDesignerSearch: options.filtersDesignerSearch
      },
      mixins: options.mixins || [],
      directives: {
        droppable: lazyDroppableDirective
      },
      data: function data() {
        return options.data;
      },
      computed: _.extend({
        isHidden: function isHidden() {
          return this.currentDesigner !== this.ownDesigner;
        },
        isCanvasDroppableAreaShouldBeVisible: function isCanvasDroppableAreaShouldBeVisible() {
          return !this.filters.length && !this.searchKeyword;
        }
      }, i18nComputed),
      methods: {
        isComplex: function isComplex(filter) {
          return filter.type === schemaEntitiesEnum.COMPLEX_FILTER;
        },
        isDraft: function isDraft(filter) {
          return filter.isDraft;
        }
      }
    };
  }
};

});