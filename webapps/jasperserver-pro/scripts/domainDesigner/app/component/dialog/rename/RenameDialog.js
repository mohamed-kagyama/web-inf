define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Dialog.extend({
  constructor: function constructor(options) {
    this.renameDialog = options.renameDialog;
    Dialog.prototype.constructor.call(this, {
      el: this.renameDialog.$mount().$el
    });
  },
  initialize: function initialize(options) {
    _.bindAll(this, "_onShow");

    this._initEvents();

    Dialog.prototype.initialize.apply(this, arguments);
  },
  _initEvents: function _initEvents() {
    this.renameDialog.$on("show", this._onShow);
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