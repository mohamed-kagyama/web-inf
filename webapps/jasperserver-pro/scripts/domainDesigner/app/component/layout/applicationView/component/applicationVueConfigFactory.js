define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/applicationVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      el: options.el,
      template: template,
      components: {
        sidebar: options.sidebar,
        domainDesignerCanvas: options.canvas,
        domainDesignerMenu: options.menu,
        tabs: options.tabs
      },
      computed: {
        contentLeftStyle: function contentLeftStyle() {
          return {
            left: this.sidebarWidth
          };
        }
      },
      data: function data() {
        return options.data;
      },
      mounted: function mounted() {
        options.resizablePanel.setElement(this.$el.querySelector('.jr-jDomainSidebar'));
      }
    };
  }
};

});