define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../../../../model/util/SimpleModel");

var i18n = require("bundle!DomainDesignerBundle");

var i18n2 = require("bundle!CommonBundle");

var placementsEnum = require("../../../../../../../common/component/enum/placementsEnum");

var fileExtensionEnum = require("../../../../../../../model/enum/fileExtensionEnum");

var uploadDialogTabEnum = require("../../enum/uploadDialogTabEnum");

var repositoryResourceChooserSearchResultModeEnum = require("../../../../../../repositoryResourceChooser/component/chooser/enum/repositoryResourceChooserSearchResultModeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_POPOVER_PLACEMENT = placementsEnum.BOTTOM_LEFT;
var DEFAULT_POPOVER_TYPE = 'error';
module.exports = SimpleModel.extend({
  defaults: function defaults() {
    return {
      title: i18n['domain.designer.advanced.options.bundlesUploadDialog.title'],
      currentTab: uploadDialogTabEnum.REPOSITORY,
      localFileLastErrorMessage: '',
      repositoryResourceChooser: {
        selectionOptions: {
          multiple: true
        },
        popover: {
          errorMessage: '',
          errorTitle: i18n2['error.title'],
          placement: DEFAULT_POPOVER_PLACEMENT,
          type: DEFAULT_POPOVER_TYPE,
          inheritTargetWidth: true,
          offset: {
            top: 2
          }
        },
        searchResultMode: repositoryResourceChooserSearchResultModeEnum.LIST,
        searchKeyword: '',
        repositoryTree: {
          nodes: [],
          selection: {}
        },
        resourcesList: {
          nodes: [],
          selection: {}
        },
        fileType: 'bundleFile'
      },
      multipleFileUpload: {
        files: [],
        infoLabel: i18n['domain.designer.advanced.options.bundlesUploadDialog.tab.localFile.info.label'],
        infoButtonLabel: i18n['domain.designer.advanced.options.bundlesUploadDialog.tab.localFile.infoButton.label'],
        actionButtonLabel: i18n['domain.designer.advanced.options.bundlesUploadDialog.tab.localFile.actionButton.label'],
        accept: fileExtensionEnum.PROPERTIES,
        multiple: true,
        popover: {
          errorMessage: '',
          errorTitle: i18n2['error.title'],
          placement: DEFAULT_POPOVER_PLACEMENT,
          type: DEFAULT_POPOVER_TYPE,
          inheritTargetWidth: true,
          offset: {
            top: 2
          }
        }
      }
    };
  },
  reset: function reset() {
    var defaultState = this.defaults(),
        defaultRepositoryResourceChooser = defaultState.repositoryResourceChooser,
        multipleFileUpload = this.get('multipleFileUpload'),
        repositoryResourceChooser = this.get('repositoryResourceChooser');
    this.set({
      currentTab: defaultState.currentTab,
      localFileLastErrorMessage: defaultState.localFileLastErrorMessage
    });

    _.extend(repositoryResourceChooser, {
      searchKeyword: defaultRepositoryResourceChooser.searchKeyword,
      searchResultMode: defaultRepositoryResourceChooser.searchResultMode
    });

    _.extend(repositoryResourceChooser.popover, defaultRepositoryResourceChooser.popover);

    _.extend(repositoryResourceChooser.repositoryTree, defaultRepositoryResourceChooser.repositoryTree);

    _.extend(repositoryResourceChooser.resourcesList, defaultRepositoryResourceChooser.resourcesList);

    multipleFileUpload.files = defaultState.multipleFileUpload.files;
    multipleFileUpload.popover = defaultState.multipleFileUpload.popover;
  }
});

});