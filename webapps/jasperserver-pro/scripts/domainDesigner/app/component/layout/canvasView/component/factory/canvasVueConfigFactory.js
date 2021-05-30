define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/canvasVueTemplate.htm");

var canvasViewDesignersEnum = require("../../../../../model/enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      data: function data() {
        return options.data;
      },
      components: {
        metadataDesigner: options.metadataDesigner,
        joinsDesigner: options.joinsDesigner,
        filtersDesigner: options.filtersDesigner,
        presentationDesigner: options.presentationDesigner,
        optionsDesigner: options.optionsDesigner,
        securityDesigner: options.securityDesigner
      },
      computed: {
        isMetadataDesignerVisible: function isMetadataDesignerVisible() {
          return this.currentDesigner === canvasViewDesignersEnum.METADATA_DESIGNER;
        },
        isJoinsDesignerVisible: function isJoinsDesignerVisible() {
          return this.currentDesigner === canvasViewDesignersEnum.JOINS_DESIGNER;
        },
        isFiltersDesignerVisible: function isFiltersDesignerVisible() {
          return this.currentDesigner === canvasViewDesignersEnum.FILTERS_DESIGNER;
        },
        isPresentationDesignerVisible: function isPresentationDesignerVisible() {
          return this.currentDesigner === canvasViewDesignersEnum.PRESENTATION_DESIGNER;
        },
        isOptionsDesignerVisible: function isOptionsDesignerVisible() {
          return this.currentDesigner === canvasViewDesignersEnum.OPTIONS_DESIGNER;
        },
        isSecurityDesignerVisible: function isSecurityDesignerVisible() {
          return this.currentDesigner === canvasViewDesignersEnum.SECURITY_DESIGNER;
        }
      }
    };
  }
};

});