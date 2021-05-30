define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!adhoc_messages");

var DialogWithModelInputValidation = require("runtime_dependencies/js-sdk/src/common/component/dialog/DialogWithModelInputValidation");

var topBottomFilterDialogTemplate = require("text!./template/topBottomFilterDialogTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = DialogWithModelInputValidation.extend({
  constructor: function constructor(options) {
    options || (options = {});
    this.options = options;
    var model = this.extendModel(this.options.model);
    DialogWithModelInputValidation.prototype.constructor.call(this, {
      modal: true,
      model: model,
      resizable: false,
      //additionalCssClasses: "topBottomNFilterDialog",
      dataNameAttribute: 'topBottomFilterDialog',
      title: i18n[model.get('type') === 'top' ? 'ADH_1236_DIALOG_TITLE_TOP' : 'ADH_1236_DIALOG_TITLE_BOTTOM'],
      content: _.template(topBottomFilterDialogTemplate, {
        i18n: i18n,
        model: _.extend({}, model.attributes)
      }),
      buttons: [{
        label: i18n['ADH_1236_DIALOG_OK'],
        action: 'ok',
        primary: true
      }, {
        label: i18n['ADH_1236_DIALOG_CANCEL'],
        action: 'cancel',
        primary: false
      }]
    });
    this.on('button:ok', _.bind(this._onOk, this));
    this.on('button:cancel', _.bind(this._onCancel, this));
  },
  extendModel: function extendModel(model) {
    model.validation = _.extend({}, {
      limit: [{
        required: true,
        msg: i18n['ADH_1236_DIALOG_ERROR_AMOUNT_REQUIRED']
      }, {
        range: [1, 999],
        msg: i18n['ADH_1236_DIALOG_ERROR_AMOUNT_RANGE']
      }]
    });
    return model;
  },
  open: function open() {
    this.bindValidation();
    DialogWithModelInputValidation.prototype.open.apply(this, arguments);
  },
  close: function close() {
    this.unbindValidation();
    this.clearValidationErrors();
    DialogWithModelInputValidation.prototype.close.apply(this, arguments);
  },
  _onCancel: function _onCancel() {
    this.close();
    this.remove();
  },
  _onOk: function _onOk() {
    if (!this.model.isValid(true)) {
      return;
    }

    this.close();
    this.remove();
    this.options.ok && this.options.ok(this.model.toJSON());
  }
});

});