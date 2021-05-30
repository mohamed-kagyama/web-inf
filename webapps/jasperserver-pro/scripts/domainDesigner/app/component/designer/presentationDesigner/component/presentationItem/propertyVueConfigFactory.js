define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/propertyTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['editProperty', 'item', 'propertyName', 'readonly'],
      components: {
        cell: options.cell,
        propertyEditor: options.propertyEditor,
        readOnlyProperty: options.readOnlyProperty
      },
      methods: {}
    };
  }
};

});