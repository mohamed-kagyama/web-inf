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
    this.schemaUploadDialog = options.schemaUploadDialog;
    Dialog.prototype.constructor.call(this, {
      el: this.schemaUploadDialog.$mount().$el
    });
  },
  initialize: function initialize(options) {
    _.bindAll(this, '_onUploadSchema', '_resetAndCloseDialog');

    this._initEvents();

    Dialog.prototype.initialize.apply(this, arguments);
  },
  _initEvents: function _initEvents() {
    this.schemaUploadDialog.$on('uploadSchema', this._onUploadSchema);
    this.schemaUploadDialog.$on('close', this._resetAndCloseDialog);
  },
  _onUploadSchema: function _onUploadSchema(schema, fileName) {
    this.trigger('uploadSchema', schema, fileName);

    this._resetAndCloseDialog();
  },
  _resetAndCloseDialog: function _resetAndCloseDialog() {
    this.schemaUploadDialog.reset();
    this.close();
  }
});

});