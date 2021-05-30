define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var adhocDesigner = require('./designer');

var $ = require('jquery');

var _ = require('underscore');

var ResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var identityUtil = require("runtime_dependencies/js-sdk/src/common/util/identityUtil");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var designerBase = require('../base/designer.base');

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;

var primaryNavModule = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
adhocDesigner.handleBack = function () {
  var data = adhocDesigner.buildSaveRequestData();

  if (adhocDesigner.filtersController.hasNotAppliedFilters()) {
    adhocDesigner.showSaveConfirmationDialog(function () {
      $(document).trigger('adhocDesigner:save', adhocDesigner.buildResourceMetadata(data));
    });
  } else {
    $(document).trigger('adhocDesigner:save', adhocDesigner.buildResourceMetadata(data));
  }
};

adhocDesigner.handleCancel = function () {
  $(document).trigger('adhocDesigner:cancel');
};

adhocDesigner.buildSaveRequestData = function () {
  var saveExisting = !!window.saveUri,
      tempFolder = saveExisting ? window.saveFolder : '/temp',
      tempName = saveExisting ? window.saveLabel : identityUtil.generateUniqueName('tmpAdv_'),
      tempDesc = saveExisting ? window.saveDesc : 'Dashboard visualization.',
      overwriteExisting = saveExisting;

  if (window.embeddedSaveAsUri) {
    tempFolder = ResourceModel.getParentFolderFromUri(window.embeddedSaveAsUri);
    tempName = ResourceModel.getNameFromUri(window.embeddedSaveAsUri);
  }

  window.embeddedSaveAsOverwrite && (overwriteExisting = window.embeddedSaveAsOverwrite);

  if (window.window.embeddedSaveAsUri) {
    tempFolder = ResourceModel.getParentFolderFromUri(window.embeddedSaveAsUri);
    tempName = ResourceModel.getNameFromUri(window.embeddedSaveAsUri);
  }

  window.embeddedSaveAsOverwrite && (overwriteExisting = window.embeddedSaveAsOverwrite);
  return {
    aruLabel: tempName,
    aruFolder: tempFolder,
    aruDesc: tempDesc,
    allOverwrite: overwriteExisting
  };
};

adhocDesigner.buildResourceMetadata = function (options) {
  var saveExisting = !!window.saveUri;
  var resourceModel = {
    uri: [options.aruFolder, options.aruLabel].join('/'),
    resourceType: repositoryResourceTypes.ADHOC_DATA_VIEW,
    type: window.localContext.mode,
    label: options.aruLabel,
    version: 1
  };

  if (!saveExisting) {
    //If we are save existing ADV reportUnitURI will be a link to temp resource
    //if we are save new ADV it will be a link to original resource.
    resourceModel['dataSourceUri'] = window.reportUnitURI;
  }

  return resourceModel;
};

adhocDesigner.saveEmbedded = function () {
  var data = adhocDesigner.buildSaveRequestData();
  designerBase.sendRequest(designerBase.getControllerPrefix() + '_save', data, function (response) {
    var options = _.clone(data);

    options.viewType = response.viewType;
    $(document).trigger('adhocDesigner:saved', adhocDesigner.buildResourceMetadata(options));
  });
};

adhocDesigner.crossDocumentListener = function (e) {
  if (e.origin === window.location.origin && e.data == 'adhocDesigner:save') {
    adhocDesigner.saveEmbedded();
  }
};

adhocDesigner.saveAndRun = function () {
  window.windowPopUp = window.open('', 'jr');
  buttonManager.disable($('execute'));

  var callback = function callback(state) {
    adhocDesigner.updateStateAndRender(state);
    window.windowPopUp.location = 'flow.html?_flowId=viewAdhocReportFlow&clientKey=' + window.clientKey + '&reportUnit=' + window.localContext.state.tempAruName + '&noReturn=true';
  };

  designerBase.sendRequest('co_saveTemp', [], callback);
};

adhocDesigner.applyAdhocTheme = function (evt, themeParent) {
  var matched = null;
  var element = evt.element();
  var newThemeId = null;

  if (themeParent) {
    var themeChoices = themeParent.childElements();
    matched = matchAny(element, ['li.button'], true);

    if (matched) {
      newThemeId = matched.identify();
      themeChoices.each(function (theme) {
        buttonManager.unSelect(theme);
      }); //select new one
      //select new one

      buttonManager.select(matched);
    }

    if (newThemeId !== window.selectedThemeId) {
      window.selectedThemeId = newThemeId;

      if ($(this.CANVAS_PARENT_ID) && window.selectedThemeId) {
        $(this.CANVAS_PARENT_ID).writeAttribute('class', newThemeId);
        this.toggleAdhocTheme();
      }
    }
  }
};
/**
* Used to edit report orientation
* @param orientation
*/

/**
     * Used to edit report orientation
     * @param orientation
     */


adhocDesigner.orientationSelected = function (orientation) {
  adhocDesigner.setPageOrientation(orientation);
  designerBase.unSelectAll();
};
/**
* Used to get the report orientation
*/

/**
     * Used to get the report orientation
     */


adhocDesigner.getOrientation = function () {
  return window.localContext.state.pageOrientation;
};
/**
* Used to test orientation equality
* @param thisValue
*/

/**
     * Used to test orientation equality
     * @param thisValue
     */


adhocDesigner.orientationEquals = function (thisValue) {
  return adhocDesigner.getOrientation() == thisValue;
};
/**
* Used to get paper size
*/

/**
     * Used to get paper size
     */


adhocDesigner.getPaperSize = function () {
  return window.localContext.state.paperSize;
};
/**
* Used to test for paper size equality
* @param thisValue
*/

/**
     * Used to test for paper size equality
     * @param thisValue
     */


adhocDesigner.paperSizeEquals = function (thisValue) {
  return adhocDesigner.getPaperSize() == thisValue;
};
/**
* Used to set paper size for report
* @param size
* @param event
*/

/**
     * Used to set paper size for report
     * @param size
     * @param event
     */


adhocDesigner.paperSizeSelected = function (size, event) {
  adhocDesigner.setPaperSize(size);
  designerBase.unSelectAll(event);
};
/*
* Used to go to Design mode
*/

/*
     * Used to go to Design mode
     */


adhocDesigner.goToDesignView = function () {
  var params = document.location.href.parseQuery();
  delete params['_flowId'];
  delete params['viewReport'];
  delete params['fromDesigner'];
  primaryNavModule.setNewLocation('designer', Object.toQueryString(params));
};
/*
* Used to go to presentation mode
*/

/*
     * Used to go to presentation mode
     */


adhocDesigner.goToPresentationView = function () {
  var params = document.location.href.parseQuery();
  delete params['_flowId'];
  params['viewReport'] = true;
  params['fromDesigner'] = true;
  primaryNavModule.setNewLocation('designer', Object.toQueryString(params));
};
/**
* Get all the folders in the available fields tree
* @param node
*/

/**
     * Get all the folders in the available fields tree
     * @param node
     */


adhocDesigner.getAllAvailableFolders = function (node) {
  var result = [];

  if (!node) {
    if (!this.availableTree) {
      return result;
    }

    node = this.availableTree.rootNode;
    result.push(node);
  }

  if (node.param.type === this.FOLDER_TYPE) {
    for (var i = 0; i < node.childs.length; i++) {
      var child = node.childs[i];

      if (child.param.type === this.FOLDER_TYPE) {
        result.push(child);
        result = result.concat(this.getAllAvailableFolders(child));
      }
    }
  }

  return result;
};

adhocDesigner.togglePagePropsRoller = function () {
  window.selectionObject.pagePropsRollDown = !window.selectionObject.pagePropsRollDown;
};

adhocDesigner.setFieldValuesOnColumnSelection = function () {};

adhocDesigner.setFieldValuesOnGroupSelection = function () {};
/*
* Called when the report itself is selected
*/

/*
     * Called when the report itself is selected
     */


adhocDesigner.selectReport = function () {
  designerBase.unSelectAll();
  this.activateReportSelectionObject();
};
/*
* Select title section and set the selection area
*/

/*
     * Select title section and set the selection area
     */


adhocDesigner.activateReportSelectionObject = function () {
  this.selectSingleObject(window.titleBar);
  window.selectionCategory.area = designerBase.TITLE_SELECT_AREA;
};
/**
* Used to determine if a single field is selected
*/

/**
     * Used to determine if a single field is selected
     */


adhocDesigner.isSingleFieldSelected = function () {
  return designerBase.getSelectedObject().length == 1;
};
/**
* Check if field is used as a column
* @param name
*/

/**
     * Check if field is used as a column
     * @param name
     */


adhocDesigner.isInColumns = function (name) {
  for (var i = 0; i < window.localContext.state.columns.length; i++) {
    if (name == window.localContext.state.columns[i]) {
      return true;
    }
  }

  return false;
};

adhocDesigner.setPageOrientation = function (orientation) {
  designerBase.sendRequest('co_setPageOrientation', ['o=' + orientation]);
};

adhocDesigner.setPaperSize = function (size) {
  designerBase.sendRequest('co_setPaperSize', ['s=' + size]);
};

module.exports = adhocDesigner;

});