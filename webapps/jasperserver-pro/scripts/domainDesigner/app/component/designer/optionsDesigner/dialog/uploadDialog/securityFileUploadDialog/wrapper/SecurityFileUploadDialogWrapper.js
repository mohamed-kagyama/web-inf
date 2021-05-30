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
    this.securityFileUploadDialog = options.securityFileUploadDialog;
    Dialog.prototype.constructor.call(this, {
      el: this.securityFileUploadDialog.$mount().$el
    });
  },
  initialize: function initialize(options) {
    _.bindAll(this, '_onAddLocalFile', '_onAddFromRepository', '_onClose');

    _.bindAll(this, '_onAddLocalFile', '_onClose');

    this._initEvents();

    Dialog.prototype.initialize.apply(this, arguments);
  },
  _initEvents: function _initEvents() {
    this.securityFileUploadDialog.$on('addLocalFile', this._onAddLocalFile);
    this.securityFileUploadDialog.$on('addFromRepository', this._onAddFromRepository);
    this.securityFileUploadDialog.$on('close', this._onClose);
  },
  open: function open() {
    var self = this;
    this.securityFileUploadDialog.open().then(function () {
      Dialog.prototype.open.apply(self, arguments);
    });
  },
  _onAddFromRepository: function _onAddFromRepository(file) {
    this.trigger('add:fromRepository', file);
    this.close();
  },
  _onAddLocalFile: function _onAddLocalFile(file) {
    this.trigger('add:localFile', file);
    this.close();
  },
  _onClose: function _onClose() {
    this.close();
  }
});

});