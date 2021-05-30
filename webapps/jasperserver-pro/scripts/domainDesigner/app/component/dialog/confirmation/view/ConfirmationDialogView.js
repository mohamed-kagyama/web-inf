define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var confirmationDialogTemplate = require("text!../template/confirmDialogTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ConfirmationDialog.extend({
  constructor: function constructor(options) {
    options = options || {};
    this.dataNameAttrs = options.dataNameAttrs;
    options.confirmDialogTemplate = _.template(confirmationDialogTemplate);
    ConfirmationDialog.prototype.constructor.call(this, options);
  },
  render: function render() {
    ConfirmationDialog.prototype.render.apply(this, arguments);

    if (this.dataNameAttrs) {
      this.$el.attr('data-name', this.dataNameAttrs.dialogTitle);
    }

    return this;
  }
});

});