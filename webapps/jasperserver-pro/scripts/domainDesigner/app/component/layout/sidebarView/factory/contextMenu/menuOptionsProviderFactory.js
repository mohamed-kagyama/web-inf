define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var menuItemWithOptionsTemplate = require("text!../../../../../common/template/menuItemWithOptionsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(menuOptions) {
    return {
      getMenuOptions: function getMenuOptions(item) {
        return {
          additionalSettings: {
            menuOptionTemplate: menuItemWithOptionsTemplate,
            hideOnMouseLeave: true
          },
          options: menuOptions.map(function (option) {
            return option(item);
          })
        };
      }
    };
  }
};

});