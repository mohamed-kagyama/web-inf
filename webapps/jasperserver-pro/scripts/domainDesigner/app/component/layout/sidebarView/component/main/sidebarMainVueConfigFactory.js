define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/sidebarMainVueTemplate.htm");

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var clickMenuDirective = options.clickMenuDirective,
        dataSourceMenuOptionsFactory = options.dataSourceMenuOptionsFactory,
        metadataDesignerSidebar = options.metadataDesignerSidebar,
        joinsDesignerResourcesForEmptyJoinTreesSidebar = options.joinsDesignerResourcesForEmptyJoinTreesSidebar,
        joinsDesignerResourcesForNotEmptyJoinTreesSidebar = options.joinsDesignerResourcesForNotEmptyJoinTreesSidebar,
        joinsDesignerJoinTreesTreeSidebar = options.joinsDesignerJoinTreesTreeSidebar,
        presentationDesignerSidebar = options.presentationDesignerSidebar,
        filtersDesignerSidebar = options.filtersDesignerSidebar,
        metadataDesignerSidebarSearch = options.metadataDesignerSidebarSearch,
        joinsDesignerSidebarSearch = options.joinsDesignerSidebarSearch,
        presentationDesignerSidebarSearch = options.presentationDesignerSidebarSearch,
        filtersDesignerSidebarSearch = options.filtersDesignerSidebarSearch;
    return {
      template: template,
      computed: _.extend({
        dataSourceMenuOptions: function dataSourceMenuOptions() {
          return dataSourceMenuOptionsFactory.create();
        }
      }, i18nComputed),
      directives: {
        clickMenu: clickMenuDirective
      },
      components: {
        metadataDesignerSidebar: metadataDesignerSidebar,
        joinsDesignerResourcesForEmptyJoinTreesSidebar: joinsDesignerResourcesForEmptyJoinTreesSidebar,
        joinsDesignerResourcesForNotEmptyJoinTreesSidebar: joinsDesignerResourcesForNotEmptyJoinTreesSidebar,
        joinsDesignerJoinTreesTreeSidebar: joinsDesignerJoinTreesTreeSidebar,
        presentationDesignerSidebar: presentationDesignerSidebar,
        filtersDesignerSidebar: filtersDesignerSidebar,
        metadataDesignerSidebarSearch: metadataDesignerSidebarSearch,
        joinsDesignerSidebarSearch: joinsDesignerSidebarSearch,
        presentationDesignerSidebarSearch: presentationDesignerSidebarSearch,
        filtersDesignerSidebarSearch: filtersDesignerSidebarSearch
      }
    };
  }
};

});