define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Dialog.extend({
  constructor: function constructor(options) {
    this.validationErrorDialog = options.validationErrorDialog;
    Dialog.prototype.constructor.call(this, {
      el: this.validationErrorDialog.$mount().$el
    });
  },
  initialize: function initialize(options) {
    _.bindAll(this, "_onShow");

    Dialog.prototype.initialize.apply(this, arguments);
    this.validationErrorDialog.$on("show", this._onShow);
  },
  _onShow: function _onShow(show) {
    if (show) {
      this.open();
    } else {
      this.close();
    }
  }
});

});