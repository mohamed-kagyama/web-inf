define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../../model/enum/canvasViewDesignersEnum");

var i18nComputed = require("../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var template = options.template,
        designerSwitcherEventBus = options.designerSwitcherEventBus;
    return {
      template: template,
      data: function data() {
        return options.data;
      },
      computed: _.extend({
        isDataManagement: function isDataManagement() {
          return this.currentDesigner === canvasViewDesignersEnum.METADATA_DESIGNER;
        },
        isJoins: function isJoins() {
          return this.currentDesigner === canvasViewDesignersEnum.JOINS_DESIGNER;
        },
        isPreFilters: function isPreFilters() {
          return this.currentDesigner === canvasViewDesignersEnum.FILTERS_DESIGNER;
        },
        isDataPresentation: function isDataPresentation() {
          return this.currentDesigner === canvasViewDesignersEnum.PRESENTATION_DESIGNER;
        },
        isOptions: function isOptions() {
          return this.currentDesigner === canvasViewDesignersEnum.OPTIONS_DESIGNER;
        },
        isSecurity: function isSecurity() {
          return this.currentDesigner === canvasViewDesignersEnum.SECURITY_DESIGNER;
        }
      }, i18nComputed),
      methods: {
        switchToDataManagement: function switchToDataManagement() {
          designerSwitcherEventBus.trigger('designer:select', canvasViewDesignersEnum.METADATA_DESIGNER);
        },
        switchToJoins: function switchToJoins() {
          designerSwitcherEventBus.trigger('designer:select', canvasViewDesignersEnum.JOINS_DESIGNER);
        },
        switchToPreFilters: function switchToPreFilters() {
          designerSwitcherEventBus.trigger('designer:select', canvasViewDesignersEnum.FILTERS_DESIGNER);
        },
        switchToDataPresentation: function switchToDataPresentation() {
          designerSwitcherEventBus.trigger('designer:select', canvasViewDesignersEnum.PRESENTATION_DESIGNER);
        },
        switchToOptions: function switchToOptions() {
          designerSwitcherEventBus.trigger('designer:select', canvasViewDesignersEnum.OPTIONS_DESIGNER);
        },
        switchToSecurity: function switchToSecurity() {
          designerSwitcherEventBus.trigger('designer:select', canvasViewDesignersEnum.SECURITY_DESIGNER);
        }
      }
    };
  }
};

});