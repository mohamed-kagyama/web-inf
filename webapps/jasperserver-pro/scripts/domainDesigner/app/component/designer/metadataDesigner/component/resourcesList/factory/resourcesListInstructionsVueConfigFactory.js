define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/resourcesListInstructionsVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      mixins: options.mixins,
      props: ['instructionTitle', 'instructionText'],
      mounted: function mounted() {
        this._destroyDroppable && this._destroyDroppable();
        this._initializeDroppable && this._initializeDroppable();
      }
    };
  }
};

});