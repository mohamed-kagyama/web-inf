define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var floatingDashletDialogTemplate = require("text!../../template/floatingDashletDialogTemplate.htm");

var i18n = require("bundle!CommonBundle");

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Dialog.extend({
  defaultTemplate: floatingDashletDialogTemplate,
  events: {
    'click .closeIcon': '_onCloseIcon'
  },
  constructor: function constructor(options) {
    _.bindAll(this, '_onCloseIcon', '_raiseDropDowns');

    _.defaults(options, {
      contentContainer: '.content > .dashletContainer',
      title: i18n['dialog.overlay.title'],
      modal: false
    });

    if (options.foundation) {
      this.foundation = options.foundation;
    }

    Dialog.call(this, options);
    var self = this; // Dropdowns of single selects should have hidhest z-index in order to be visible.
    // Dropdowns of single selects should have hidhest z-index in order to be visible.

    this.on('dialog:visible', this._raiseDropDowns);
    this.on('close', function () {
      $('.sSelect-dropDown').css('zIndex', null);
    });
  },
  _raiseDropDowns: function _raiseDropDowns() {
    var dropDowns = $('.sSelect-dropDown'),
        dialogZIndex = this.$el.css('zIndex');

    if (dialogZIndex == 'auto') {
      dialogZIndex = 1005;
    }

    dropDowns.css('zIndex', 2 + parseInt(dialogZIndex));
  },
  remove: function remove() {
    this.off('dialog:visible');
    this.off('close');
    Dialog.prototype.remove.apply(this, arguments);
  },
  updateTitle: function updateTitle(title) {
    var titleElement = this.$el.find('.content > .header > .title');
    titleElement.length && titleElement.text(title);
  },
  _onCloseIcon: function _onCloseIcon() {
    this.foundation.trigger('close:filterDialog');
  }
});

});