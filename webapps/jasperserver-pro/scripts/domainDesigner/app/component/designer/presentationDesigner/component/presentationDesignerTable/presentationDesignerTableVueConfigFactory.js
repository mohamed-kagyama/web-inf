define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var columnSetUtil = require("../../util/columnSetUtil");

var template = require("text!./template/presentationDesignerTableTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus;
    return {
      template: template,
      props: ['models', 'searchKeyword', 'scrollBarWidth', 'isScrollBarPresent', 'columnSet', 'column0Width', 'column1Width', 'scrollPos', 'top', 'height', 'editProperty', 'emptyDataIslandsDropZone', 'isEmptyDataStructure'],
      components: {
        dropZone: options.dropZone,
        lastRow: options.lastRow,
        tableHeader: options.header,
        dataIslandOrSet: options.dataIslandOrSet,
        presentationField: options.presentationField,
        emptyDataIslands: options.emptyDataIslands,
        virtualData: options.virtualData
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        },
        modelsArePresent: function modelsArePresent() {
          return Boolean(this.models.length);
        }
      },
      updated: function updated() {
        presentationDesignerEventBus.trigger('canvas:update');
      },
      methods: _.extend({
        isDataIsland: function isDataIsland(item) {
          return entityUtil.isDataIsland(item.modelType);
        },
        isPresentationSet: function isPresentationSet(item) {
          return entityUtil.isPresentationSet(item.modelType);
        },
        isPresentationField: function isPresentationField(item) {
          return entityUtil.isPresentationField(item.modelType);
        },
        isDropZone: function isDropZone(item) {
          return item.isDropZone;
        },
        isLastRow: function isLastRow(item) {
          return item.isLastRow;
        }
      }, columnSetUtil)
    };
  }
};

});