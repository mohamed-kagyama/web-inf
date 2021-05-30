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
    this.bundlesUploadDialog = options.bundlesUploadDialog;
    Dialog.prototype.constructor.call(this, {
      el: this.bundlesUploadDialog.$mount().$el
    });
  },
  initialize: function initialize(options) {
    _.bindAll(this, '_onAddLocalFiles', '_onAddFromRepository', '_onClose');

    this._initEvents();

    Dialog.prototype.initialize.apply(this, arguments);
  },
  open: function open() {
    var self = this;
    this.bundlesUploadDialog.open().then(function () {
      Dialog.prototype.open.apply(self, arguments);
    });
  },
  _initEvents: function _initEvents() {
    this.bundlesUploadDialog.$on('addLocalFiles', this._onAddLocalFiles);
    this.bundlesUploadDialog.$on('addFromRepository', this._onAddFromRepository);
    this.bundlesUploadDialog.$on('close', this._onClose);
  },
  _onAddFromRepository: function _onAddFromRepository(files) {
    this.trigger('add:fromRepository', files);
    this.close();
  },
  _onAddLocalFiles: function _onAddLocalFiles(files) {
    this.trigger('add:localFiles', files);
    this.close();
  },
  _onClose: function _onClose() {
    this.close();
  }
});

});