define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var presentationDesignerSelectionFactory = require("../../../model/factory/presentationDesignerSelectionFactory");

var PresentationDesignerViewStateModelService = require("../../../model/service/PresentationDesignerViewStateModelService");

var PresentationCanvasDroppableItemsService = require("../../../component/designer/presentationDesigner/droppable/canvas/service/PresentationCanvasDroppableItemsService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  context.register('presentationDesignerViewStateModelService', new PresentationDesignerViewStateModelService({
    presentationItemsSelectionFactory: presentationDesignerSelectionFactory,
    presentationSidebarSelectionFactory: presentationDesignerSelectionFactory,
    viewStateModel: context.get('viewStateModelReadOnlyFacade'),
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('presentationCanvasDroppableItemsService', new PresentationCanvasDroppableItemsService({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
};

});