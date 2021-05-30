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
      title: i18n['domain.designer.advanced.options.securityFileUploadDialog.title'],
      currentTab: uploadDialogTabEnum.LOCAL_FILE,
      // We suggest to load a local file in first place.
      repositoryResourceChooser: {
        selectionOptions: {
          multiple: false
        },
        popover: {
          errorMessage: '',
          errorTitle: i18n2['error.title'],
          placement: DEFAULT_POPOVER_PLACEMENT,
          type: DEFAULT_POPOVER_TYPE,
          inheritTargetWidth: true
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
        fileType: 'securityFile'
      },
      singleFileUpload: {
        file: null,
        fileInputPlaceholder: i18n2['input.file.not.selected'],
        actionButtonLabel: i18n2['button.browse'],
        accept: fileExtensionEnum.XML,
        errorMessage: ''
      }
    };
  },
  reset: function reset() {
    var defaultState = this.defaults(),
        defaultRepositoryResourceChooser = defaultState.repositoryResourceChooser,
        singleFileUpload = this.get('singleFileUpload'),
        repositoryResourceChooser = this.get('repositoryResourceChooser');
    this.set({
      currentTab: defaultState.currentTab
    });

    _.extend(repositoryResourceChooser, {
      searchKeyword: defaultRepositoryResourceChooser.searchKeyword,
      searchResultMode: defaultRepositoryResourceChooser.searchResultMode
    });

    _.extend(repositoryResourceChooser.popover, defaultRepositoryResourceChooser.popover);

    _.extend(repositoryResourceChooser.repositoryTree, defaultRepositoryResourceChooser.repositoryTree);

    _.extend(repositoryResourceChooser.resourcesList, defaultRepositoryResourceChooser.resourcesList);

    _.extend(singleFileUpload, {
      file: defaultState.singleFileUpload.file,
      errorMessage: defaultState.singleFileUpload.errorMessage
    });
  }
});

});