define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../../model/util/SimpleModel");

var i18n = require("bundle!DomainDesignerBundle");

var placementsEnum = require("../../../../../common/component/enum/placementsEnum");

var repositoryResourceChooserSearchResultModeEnum = require("../../chooser/enum/repositoryResourceChooserSearchResultModeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_POPOVER_PLACEMENT = placementsEnum.BOTTOM_LEFT;
var DEFAULT_POPOVER_TYPE = 'error';
module.exports = SimpleModel.extend({
  defaults: function defaults(options) {
    return {
      isCheckInProgress: false,
      repositoryResourceChooser: {
        popover: {
          errorMessage: '',
          errorTitle: i18n['domain.designer.resource.chooser.popover.title.error'],
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
          selection: {},
          itemHeight: options.listItemHeight,
          scrollPos: 0
        }
      }
    };
  },
  reset: function reset() {
    var defaultState = this.defaults(),
        defaultRepositoryResourceChooser = defaultState.repositoryResourceChooser,
        repositoryResourceChooser = this.get('repositoryResourceChooser');
    this.set({
      checkedNode: defaultState.checkedNode,
      isCheckInProgress: defaultState.isCheckInProgress,
      selectedNode: defaultState.selectedNode
    });

    _.extend(repositoryResourceChooser, {
      searchResultMode: defaultRepositoryResourceChooser.searchResultMode,
      searchKeyword: defaultRepositoryResourceChooser.searchKeyword
    });

    _.extend(repositoryResourceChooser.popover, defaultRepositoryResourceChooser.popover);

    _.extend(repositoryResourceChooser.repositoryTree, defaultRepositoryResourceChooser.repositoryTree);

    _.extend(repositoryResourceChooser.resourcesList, defaultRepositoryResourceChooser.resourcesList);
  }
});

});