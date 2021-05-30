define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var dialogTemplate = require("text!./template/devToolsDialogTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Dialog.extend({
  constructor: function constructor() {
    Dialog.prototype.constructor.call(this, {
      modal: false,
      resizable: true,
      minWidth: 350,
      minHeight: 400,
      title: 'Dev Tools',
      content: _.template(dialogTemplate)(),
      buttons: [{
        label: 'Set state',
        action: 'update',
        primary: true
      }, {
        label: 'Cancel',
        action: 'cancel',
        primary: false
      }]
    });
    this.editorTextArea = this.$el.find('.jr-jDevTools-editor-textArea');
  },
  initialize: function initialize(options) {
    this.listenTo(this, 'button:cancel', this._onCancelButtonClick);
    Dialog.prototype.initialize.apply(this, arguments);
  },
  open: function open(state) {
    this.editorTextArea.val(JSON.stringify(state));
    Dialog.prototype.open.call(this);
  },
  getState: function getState() {
    return JSON.parse(this.editorTextArea.val());
  },
  close: function close() {
    this.editorTextArea.val('');
    Dialog.prototype.close.call(this);
  },
  _onCancelButtonClick: function _onCancelButtonClick() {
    this.close();
  }
});

});