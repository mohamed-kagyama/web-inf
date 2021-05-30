define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CannotCreateJoinAttentionDialogController = function CannotCreateJoinAttentionDialogController(options) {
  this.initialize(options);
};

_.extend(CannotCreateJoinAttentionDialogController.prototype, {
  initialize: function initialize(options) {
    this.attentionDialog = options.attentionDialog;
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'attentionDialog:close', this._closeAttentionDialog);
  },
  _closeAttentionDialog: function _closeAttentionDialog() {
    this.attentionDialog.close();
  }
}, Backbone.Events);

module.exports = CannotCreateJoinAttentionDialogController;

});