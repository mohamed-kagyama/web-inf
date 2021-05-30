define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../../../../model/util/resourcePropertiesUtil");

var resourceDownloadUtil = require("../util/resourceDownloadUtil");

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// TODO: @gtoffoli this file is no longer used, replaced by the new Security designer
var OptionsDesignerDownloadSecurityFileController = function OptionsDesignerDownloadSecurityFileController(options) {
  this.optionsDesignerEventBus = options.optionsDesignerEventBus;
  this.resourcesService = options.resourcesService;

  this._initEvents();
};

_.extend(OptionsDesignerDownloadSecurityFileController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.optionsDesignerEventBus, 'download:securityFile', this._onDownloadSecurityFile);
  },
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

module.exports = OptionsDesignerDownloadSecurityFileController;

});