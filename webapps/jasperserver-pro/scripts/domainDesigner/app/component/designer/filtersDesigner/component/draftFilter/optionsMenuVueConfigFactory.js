define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/optionsMenuTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var draftFilterOptionsMenuOptionsFactory = options.draftFilterOptionsMenuOptionsFactory,
        clickMenuDirective = options.clickMenuDirective;
    return {
      template: template,
      directives: {
        clickMenu: clickMenuDirective
      },
      props: ['filter'],
      computed: {
        menuOptions: function menuOptions() {
          return draftFilterOptionsMenuOptionsFactory.create(this.filter);
        }
      }
    };
  }
};

});