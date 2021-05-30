define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var base64 = require("runtime_dependencies/js-sdk/src/common/util/base64");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var subResourceTypesEnum = require("../../../../model/enum/subResourceTypesEnum");

var storeChangeEventCallbackExecutorUtil = require("../../../../common/util/storeChangeEventCallbackExecutorUtil");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var OptionsDesignerSecurityFileUploadDialogController = function OptionsDesignerSecurityFileUploadDialogController(options) {
  this.initialize(options);
};

_.extend(OptionsDesignerSecurityFileUploadDialogController.prototype, {
  initialize: function initialize(options) {
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.optionsDesignerEventBus = options.optionsDesignerEventBus;
    this.securityFileUploadDialog = options.securityFileUploadDialog;
    this.notification = options.notification;
    this.optionsDesignerStore = options.optionsDesignerStore;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    var executor = storeChangeEventCallbackExecutorUtil.getExecutor(this);
    this.listenTo(this.storeChangeEventBus, 'change', executor);
    this.listenTo(this.optionsDesignerEventBus, 'show:securityFileUploadDialog', this._onShowSecurityFileUploadDialog);
    this.listenTo(this.securityFileUploadDialog, 'add:fromRepository', this._onAddSecurityFileFromRepository);
    this.listenTo(this.securityFileUploadDialog, 'add:localFile', this._onAddSecurityFileFromFileSystem);
  },
  _onShowSecurityFileUploadDialog: function _onShowSecurityFileUploadDialog() {
    this.securityFileUploadDialog.open();
  },
  _onAddSecurityFileFromRepository: function _onAddSecurityFileFromRepository(uri) {
    var securityFile = {
      uri: uri,
      type: subResourceTypesEnum.FILE_REFERENCE
    };

    this._triggerAddSecurityFile(securityFile);
  },
  _onAddSecurityFileFromFileSystem: function _onAddSecurityFileFromFileSystem(securityFile) {
    var content = securityFile.content,
        name = securityFile.name;
    var base64Content = base64.encode(content);

    this._triggerAddSecurityFile({
      content: {
        raw: content,
        base64: base64Content
      },
      type: subResourceTypesEnum.FILE,
      label: name
    });
  },
  _triggerAddSecurityFile: function _triggerAddSecurityFile(securityFile) {
    // This call will dispatch an application event that eventually will be catched
    // by the RSecurityEditor, which is listening for this event.
    // The control is taken then from the React component which will show, if needed, a proper
    // Warning dialog about the file replacement and will finally commit the change.
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.SECURITY_DESIGNER_SHOW_REPLACE_FILE_CONFIRM_DIALOG, securityFile); // var needToReplaceSecurityFile = Boolean(this.optionsDesignerStore.get('securityFile'));
    // if (needToReplaceSecurityFile) {
    //     // We should ask at this point for an user confirmation before "commit" the state...
    //     this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_REPLACE_SECURITY_FILE, securityFile);
    // } else {
    //     this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_SECURITY_FILE, securityFile);
    // }
  },
  'optionsDesigner:replaceSecurityFile': function optionsDesignerReplaceSecurityFile() {// this.notification.show({
    //     message: i18nMessage('domain.designer.advanced.options.securityFileReplaced.notification'),
    //     type: 'success'
    // });
  }
}, Backbone.Events);

module.exports = OptionsDesignerSecurityFileUploadDialogController;

});