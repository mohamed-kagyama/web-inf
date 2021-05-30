define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

var ViewStateModel = require("../../model/ViewStateModel");

var ViewStateModelService = require("../../model/service/ViewStateModelService");

var designerViewStateMetadataDesignerFirstDataSourceSelectionProvider = require("../../model/service/provider/designerViewStateMetadataDesignerFirstDataSourceSelectionProvider");

var DesignerViewStateFiltersPositionsProvider = require("../../model/service/provider/DesignerViewStateFiltersPositionsProvider");

var designerViewStateJoinTreesStateProvider = require("../../model/service/provider/designerViewStateJoinTreesStateProvider");

var designerViewStateJoinsStateProvider = require("../../model/service/provider/designerViewStateJoinsStateProvider");

var copyMethodAndEventsUtil = require('../../../util/methodProxy/copyMethodAndEventsUtil');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var copyReadOnlyMethodsAndEvents = copyMethodAndEventsUtil.copyReadOnlyMethodsAndEvents;

function createViewStateModel(context, options) {
  var viewStateModel = new ViewStateModel({}, {
    currentTab: options.defaultTab,
    currentDesigner: options.defaultDesigner,
    runtime: {
      presentationDesigner: {
        cellsWidth: options.presentationDesigner.cellsWidth
      }
    }
  });
  var viewStateModelReadOnlyFacade = copyReadOnlyMethodsAndEvents(viewStateModel);
  context.register('viewStateModelReadOnlyFacade', viewStateModelReadOnlyFacade);
  context.register('designerViewStateMetadataDesignerFirstDataSourceSelectionProvider', designerViewStateMetadataDesignerFirstDataSourceSelectionProvider);
  context.register('designerViewStateFiltersPositionsProvider', new DesignerViewStateFiltersPositionsProvider({
    sequenceGenerator: new SequenceGenerator(0)
  }));
  context.register('designerViewStateJoinTreesStateProvider', designerViewStateJoinTreesStateProvider);
  context.register('designerViewStateJoinsStateProvider', designerViewStateJoinsStateProvider);
  context.register('viewStateModelService', new ViewStateModelService({
    designerViewStateMetadataDesignerFirstDataSourceSelectionProvider: context.get('designerViewStateMetadataDesignerFirstDataSourceSelectionProvider'),
    designerViewStateFiltersPositionsProvider: context.get('designerViewStateFiltersPositionsProvider'),
    designerViewStateJoinTreesStateProvider: context.get('designerViewStateJoinTreesStateProvider'),
    designerViewStateJoinsStateProvider: context.get('designerViewStateJoinsStateProvider'),
    viewStateModel: viewStateModel,
    dataStore: context.get('dataStoreReadWrite')
  }));
}

module.exports = createViewStateModel;

});