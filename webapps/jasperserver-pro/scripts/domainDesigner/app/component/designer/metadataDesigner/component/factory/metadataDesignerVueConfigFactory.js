define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var popoverDirective = require("../../../../../common/component/popover/directive/popoverDirective");

var template = require("text!../template/metadataDesignerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var metadataDesignerEventBus = options.metadataDesignerEventBus,
        sourceList = options.sourceList,
        resultList = options.resultList,
        resultListInstructions = options.resultListInstructions,
        schemaAttribute = options.schemaAttribute,
        availableResourcesSearch = options.availableResourcesSearch,
        selectedResourcesSearch = options.selectedResourcesSearch,
        swapButtons = options.swapButtons;
    return {
      template: template,
      directives: {
        popover: popoverDirective
      },
      data: function data() {
        return options.data;
      },
      computed: {
        isInstructionsShouldBeVisible: function isInstructionsShouldBeVisible() {
          return Boolean(this.resourceInfo.instructionTitle && this.resourceInfo.instructionText);
        }
      },
      components: {
        sourceList: sourceList,
        resultList: resultList,
        resultListInstructions: resultListInstructions,
        schemaAttribute: schemaAttribute,
        availableResourcesSearch: availableResourcesSearch,
        selectedResourcesSearch: selectedResourcesSearch,
        swapButtons: swapButtons
      },
      methods: {
        onPopoverClose: function onPopoverClose() {
          metadataDesignerEventBus.trigger('errorPopover:close');
        },
        onSourceListDrop: function onSourceListDrop(resources) {
          metadataDesignerEventBus.trigger('sourceList:drop', resources);
        },
        onResultListDrop: function onResultListDrop(resources) {
          metadataDesignerEventBus.trigger('resultList:drop', resources);
        }
      }
    };
  }
};

});