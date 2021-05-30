define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var SwapButtonsStore = require("../../../component/designer/metadataDesigner/component/swapButtons/store/SwapButtonsStore");

var SearchStore = require("../../../common/component/search/store/SearchStore");

var MetadataDesignerStore = require("../../../component/designer/metadataDesigner/component/store/MetadataDesignerStore");

var SidebarLayoutStore = require("../../../component/layout/sidebarView/component/store/SidebarLayoutStore");

var DataSourceMetadataTreeModel = require("../../../component/designer/metadataDesigner/model/DataSourceMetadataTreeModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  var metadataDesignerViewModelOptions = {
    ownDesigner: canvasViewDesignersEnum.METADATA_DESIGNER
  };
  context.register('metadataDesignerSidebarSearchStore', new SearchStore(metadataDesignerViewModelOptions));
  var metadataDesignerVueStore = new MetadataDesignerStore(_.extend({}, metadataDesignerViewModelOptions, {
    popoverOffset: options.metadataDesigner.emptyResourcesTooltipOffset
  }));
  context.register('metadataDesignerVueStore', metadataDesignerVueStore);
  context.register('swapButtonsStore', new SwapButtonsStore());
  context.register('sourceTreeViewModel', new DataSourceMetadataTreeModel(metadataDesignerViewModelOptions));
  context.register('resultTreeViewModel', new DataSourceMetadataTreeModel(metadataDesignerViewModelOptions));
  context.register('metadataDesignerSidebarStore', new SidebarLayoutStore(metadataDesignerViewModelOptions));
};

});