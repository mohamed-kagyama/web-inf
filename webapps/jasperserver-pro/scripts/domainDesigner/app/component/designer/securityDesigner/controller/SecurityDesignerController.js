define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var base64 = require("runtime_dependencies/js-sdk/src/common/util/base64");

var resourceDownloadUtil = require("../../optionsDesigner/util/resourceDownloadUtil");

var resourcePropertiesUtil = require("../../../../model/util/resourcePropertiesUtil");

var subResourceTypesEnum = require("../../../../model/enum/subResourceTypesEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SecurityDesignerController = function SecurityDesignerController(options) {
  this.storeChangeEventBus = options.storeChangeEventBus;
  this.securityDesignerStore = options.securityDesignerStore;
  this.securityFileUploadDialog = options.securityFileUploadDialog;
  this.securityDesignerResourcePropertiesToStoreConverter = options.securityDesignerResourcePropertiesToStoreConverter;

  this._initEvents();

  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
};

_.extend(SecurityDesignerController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    // The security designer uses an internal state based on the React component.
    // It listen to events from inside, so it essentially does no need to register
    // here an onChange callback. We keep it just, but the callback is essentially empty.
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState); // We handle here the download of the security file, even if this could be done internally
    // inside the React component

    this.listenTo(this.storeChangeEventBus, 'download:securityFile', this._onDownloadSecurityFile);
  },
  _onChangeState: function _onChangeState(state) {// const viewState = state.viewState;
    // this.securityDesignerStore.set({'currentDesigner': viewState.getCurrentDesigner()});
    // if (this.securityDesignerStore.get('currentDesigner') === this.securityDesignerStore.get('ownDesigner')) {
    //     this._updateStoreFromState(state);
    // }
  },
  // _updateStoreFromState: function (state) {
  //     const viewState = this.securityDesignerResourcePropertiesToStoreConverter.convert(state);
  //     this.securityDesignerStore.set(viewState);
  // },
  _getFileNameForUrlDownload: function _getFileNameForUrlDownload(securityFile) {
    var fileName = resourcePropertiesUtil.parseFileNameFromUrl(securityFile.uri);
    return resourcePropertiesUtil.createSecurityFileLabelForDownload(fileName);
  },
  _getFileNameForContentDownload: function _getFileNameForContentDownload(securityFile) {
    return resourcePropertiesUtil.createSecurityFileLabelForDownload(securityFile.label);
  },
  _onDownloadSecurityFile: function _onDownloadSecurityFile(securityFile) {
    resourceDownloadUtil.downloadResource(securityFile, this._getFileNameForUrlDownload, this._getFileNameForContentDownload);
  }
});

module.exports = SecurityDesignerController;

});