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
    this.repositoryResourceChooserDialog = options.repositoryResourceChooserDialog;
    Dialog.prototype.constructor.call(this, {
      el: this.repositoryResourceChooserDialog.$mount().$el
    });
  },
  initialize: function initialize(options) {
    _.bindAll(this, '_onConfirm', '_onReject');

    this._initEvents();

    Dialog.prototype.initialize.apply(this, arguments);
  },
  open: function open(selection) {
    var self = this;
    this.repositoryResourceChooserDialog.open(selection).then(function () {
      Dialog.prototype.open.apply(self, arguments);
    });
  },
  _initEvents: function _initEvents() {
    this.repositoryResourceChooserDialog.$on('confirm', this._onConfirm);
    this.repositoryResourceChooserDialog.$on('reject', this._onReject);
  },
  _onConfirm: function _onConfirm(options) {
    this.trigger('dialog:resource:confirm', options);
  },
  _onReject: function _onReject() {
    this.trigger('dialog:resource:reject');
  }
});

});