define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var storeChangeEventCallbackExecutorUtil = require("../../../../common/util/storeChangeEventCallbackExecutorUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var validationStateNameEnum = require("../../../validation/state/enum/validationStateNameEnum");

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var OptionsDesignerUploadSchemaController = function OptionsDesignerUploadSchemaController(options) {
  this.storeChangeEventBus = options.storeChangeEventBus;
  this.notification = options.notification;
  this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
  this.uploadSchemaDialog = options.uploadSchemaDialog;
  this.validationStateFactory = options.validationStateFactory;

  this._initEvents();
};

_.extend(OptionsDesignerUploadSchemaController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    var executor = storeChangeEventCallbackExecutorUtil.getExecutor(this);
    this.listenTo(this.storeChangeEventBus, 'change', executor);
    this.listenTo(this.applicationCrossComponentEventBus, 'schema:upload', this._showUploadSchemaDialog);
    this.listenTo(this.uploadSchemaDialog, 'uploadSchema', this._afterSchemaFileSelected);
  },
  _showUploadSchemaDialog: function _showUploadSchemaDialog() {
    this.uploadSchemaDialog.open();
  },
  _afterSchemaFileSelected: function _afterSchemaFileSelected(schema, fileName) {
    var type = this._getExtensionFromFileName(fileName);

    this.validationStateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE, {
      domainSchemaString: schema,
      domainSchemaType: type
    });
  },
  _getExtensionFromFileName: function _getExtensionFromFileName(fileName) {
    return fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
  },
  'optionsDesigner:uploadSchema': function optionsDesignerUploadSchema() {
    this.notification.show({
      message: i18nMessage('domain.designer.advanced.options.updateSchema.success.notification'),
      type: 'success'
    });
  }
});

module.exports = OptionsDesignerUploadSchemaController;

});