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
var OptionsDesignerDownloadBundleController = function OptionsDesignerDownloadBundleController(options) {
  this.optionsDesignerEventBus = options.optionsDesignerEventBus;

  this._initEvents();
};

_.extend(OptionsDesignerDownloadBundleController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.optionsDesignerEventBus, 'download:bundle', this._onDownloadBundle);
  },
  _getFileNameForUrlDownload: function _getFileNameForUrlDownload(bundle) {
    return resourcePropertiesUtil.parseFileNameFromUrl(bundle.uri);
  },
  _getFileNameForContentDownload: function _getFileNameForContentDownload(bundle) {
    return resourcePropertiesUtil.createBundleLabelFromLabelAndLocale(bundle.label, bundle.locale);
  },
  _onDownloadBundle: function _onDownloadBundle(bundle) {
    resourceDownloadUtil.downloadResource(bundle, this._getFileNameForUrlDownload, this._getFileNameForContentDownload);
  }
});

module.exports = OptionsDesignerDownloadBundleController;

});