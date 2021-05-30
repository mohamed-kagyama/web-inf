define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var base64 = require("runtime_dependencies/js-sdk/src/common/util/base64");

var subResourceTypesEnum = require("../../../../model/enum/subResourceTypesEnum");

var resourcePropertiesUtil = require("../../../../model/util/resourcePropertiesUtil");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OptionsDesignerBundlesUploadDialogController = function OptionsDesignerBundlesUploadDialogController(options) {
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.optionsDesignerEventBus = options.optionsDesignerEventBus;
  this.bundlesUploadDialog = options.bundlesUploadDialog;
  this.replaceBundlesDialog = options.replaceBundlesDialog;
  this.replaceBundlesDialogStore = options.replaceBundlesDialogStore;
  this.clientResourcePropertiesService = options.clientResourcePropertiesService;

  this._initEvents();
};

_.extend(OptionsDesignerBundlesUploadDialogController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.optionsDesignerEventBus, 'show:bundlesUploadDialog', this._onShowBundlesUploadDialog);
    this.listenTo(this.optionsDesignerEventBus, 'replaceBundlesDialog:replaceBundles', this._onReplaceBundlesDialogReplaceBundles);
    this.listenTo(this.optionsDesignerEventBus, 'replaceBundlesDialog:selectNewFiles', this._onReplaceBundlesDialogSelectNewFiles);
    this.listenTo(this.optionsDesignerEventBus, 'replaceBundlesDialog:cancel', this._onReplaceBundlesDialogCancel);
    this.listenTo(this.bundlesUploadDialog, 'add:fromRepository', this._onAddBundlesFromRepository);
    this.listenTo(this.bundlesUploadDialog, 'add:localFiles', this._onAddBundlesFromFileSystem);
  },
  _onShowBundlesUploadDialog: function _onShowBundlesUploadDialog() {
    this.bundlesUploadDialog.open();
  },
  _onReplaceBundlesDialogReplaceBundles: function _onReplaceBundlesDialogReplaceBundles(bundles) {
    this.replaceBundlesDialog.close();
    bundles = this.clientResourcePropertiesService.replaceBundles(bundles);
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_REPLACE_BUNDLES, bundles);
  },
  _onReplaceBundlesDialogSelectNewFiles: function _onReplaceBundlesDialogSelectNewFiles() {
    this.replaceBundlesDialog.close();
    this.bundlesUploadDialog.open();
  },
  _onReplaceBundlesDialogCancel: function _onReplaceBundlesDialogCancel() {
    this.replaceBundlesDialog.close();
  },
  _onAddBundlesFromRepository: function _onAddBundlesFromRepository(uris) {
    var bundles = this._getBundlesByRepositoryFilesUris(uris);

    this._addBundlesOrShowWarningDialogIfDuplicatesExist(bundles);
  },
  _getBundlesByRepositoryFilesUris: function _getBundlesByRepositoryFilesUris(uris) {
    return uris.map(function (uri) {
      var fileName = resourcePropertiesUtil.parseFileNameFromUrl(uri),
          locale = resourcePropertiesUtil.getBundleLocaleNameFromFileName(fileName),
          label = resourcePropertiesUtil.parseBundleLabelFromUrl(uri, locale);
      return {
        uri: uri,
        type: subResourceTypesEnum.FILE_REFERENCE,
        locale: locale,
        label: label
      };
    });
  },
  _onAddBundlesFromFileSystem: function _onAddBundlesFromFileSystem(bundles) {
    bundles = this._getBundlesByBundleLocalFiles(bundles);

    this._addBundlesOrShowWarningDialogIfDuplicatesExist(bundles);
  },
  _getBundlesByBundleLocalFiles: function _getBundlesByBundleLocalFiles(bundles) {
    return bundles.map(function (bundle) {
      var locale = resourcePropertiesUtil.getBundleLocaleNameFromFileName(bundle.name),
          label = resourcePropertiesUtil.parseBundleLabelFromFileName(bundle.name, locale);
      return {
        content: {
          raw: bundle.content,
          base64: base64.encode(bundle.content)
        },
        type: subResourceTypesEnum.FILE,
        locale: locale,
        label: label
      };
    });
  },
  _addBundlesOrShowWarningDialogIfDuplicatesExist: function _addBundlesOrShowWarningDialogIfDuplicatesExist(bundles) {
    if (this.clientResourcePropertiesService.isAnyDuplicateBundles(bundles)) {
      this.replaceBundlesDialogStore.set('bundles', bundles);
      this.replaceBundlesDialog.open();
    } else {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_BUNDLES, bundles);
    }
  }
});

module.exports = OptionsDesignerBundlesUploadDialogController;

});