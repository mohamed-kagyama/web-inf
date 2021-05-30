define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var SearchStore = require("../../../common/component/search/store/SearchStore");

var FiltersDesignerStore = require("../../../component/designer/filtersDesigner/store/FiltersDesignerStore");

var SidebarLayoutStore = require("../../../component/layout/sidebarView/component/store/SidebarLayoutStore");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  var filtersDesignerViewModelOptions = {
    ownDesigner: canvasViewDesignersEnum.FILTERS_DESIGNER
  };
  context.register('filtersDesignerSidebarSearchStore', new SearchStore(filtersDesignerViewModelOptions));
  context.register('filtersDesignerSidebarStore', new SidebarLayoutStore(filtersDesignerViewModelOptions));
  context.register('filtersDesignerStore', new FiltersDesignerStore(_.extend(filtersDesignerViewModelOptions, {
    canvasHeight: options.filtersDesigner.height.canvas
  })));
};

});