define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var _ = require('underscore');

var i18n = require("bundle!CommonBundle");

var template = require("text!../../template/overlayDialogTemplate.htm");

var dashboardSettings = require('../../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Dialog.extend({
  defaultTemplate: template,
  constructor: function constructor(options) {
    _.defaults(options, {
      contentContainer: '.body > .message',
      title: i18n['dialog.overlay.title'],
      modal: true
    });

    Dialog.call(this, options);
  },
  open: function open() {
    var self = this,
        args = arguments;
    this.dimmer.css({
      opacity: 0
    }).show();
    this._timeout = setTimeout(function () {
      self.dimmer.css({
        opacity: 0.6
      });
      Dialog.prototype.open.apply(self, args);
    }, dashboardSettings.DASHBOARD_OVERLAY_TIMEOUT);
  },
  close: function close() {
    clearTimeout(this._timeout);
    Dialog.prototype.close.call(this);
    this.dimmer.css({
      opacity: 0.6
    }).hide();
  }
});

});