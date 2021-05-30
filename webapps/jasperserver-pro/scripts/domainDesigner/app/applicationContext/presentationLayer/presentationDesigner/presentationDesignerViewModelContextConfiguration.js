define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var PresentationDesignerStore = require("../../../component/designer/presentationDesigner/store/PresentationDesignerStore");

var SidebarLayoutStore = require("../../../component/layout/sidebarView/component/store/SidebarLayoutStore");

var SearchStore = require("../../../common/component/search/store/SearchStore");

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  var presentationDesignerOptions = {
    ownDesigner: canvasViewDesignersEnum.PRESENTATION_DESIGNER
  };
  context.register('presentationDesignerSidebarSearchStore', new SearchStore(presentationDesignerOptions));
  context.register('presentationDesignerStore', new PresentationDesignerStore(_.extend({
    canvasHeight: options.presentationDesigner.height.canvas,
    resizer: options.presentationDesigner.resizer,
    column0Width: options.presentationDesigner.columnDefaultWidths.column0Width,
    column1Width: options.presentationDesigner.columnDefaultWidths.column1Width
  }, presentationDesignerOptions, options.presentationDesigner.cellsWidth)));
  context.register('presentationDesignerSidebarStore', new SidebarLayoutStore(presentationDesignerOptions));
};

});