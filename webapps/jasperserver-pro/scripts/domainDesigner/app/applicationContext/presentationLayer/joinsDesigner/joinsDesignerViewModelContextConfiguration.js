define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var JoinsDesignerStore = require("../../../component/designer/joinsDesigner/store/JoinsDesignerStore");

var ConstantJoinExpressionDialogStore = require("../../../component/designer/joinsDesigner/dialog/constantJoinExpression/component/main/store/ConstantJoinExpressionDialogStore");

var JoinsDesignerResourcesTreeSidebarStore = require("../../../component/designer/joinsDesigner/sidebar/store/JoinsDesignerResourcesTreeSidebarStore");

var JoinsDesignerJoinTreesTreeSidebarStore = require("../../../component/designer/joinsDesigner/sidebar/store/JoinsDesignerJoinTreesTreeSidebarStore");

var SelectOptionsWithAdditionalPropsFactory = require("../../../component/designer/joinsDesigner/factory/SelectOptionsWithAdditionalPropsFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  var joinsDesignerViewModelOptions = {
    ownDesigner: canvasViewDesignersEnum.JOINS_DESIGNER
  };
  context.register('joinsDesignerViewModelOptions', joinsDesignerViewModelOptions);
  context.register('joinsDesignerStore', new JoinsDesignerStore(_.extend({
    canvasHeight: options.joinsDesigner.height.canvas
  }, joinsDesignerViewModelOptions)));
  context.register('joinsDesignerResourcesTreeSidebarStore', new JoinsDesignerResourcesTreeSidebarStore(joinsDesignerViewModelOptions));
  context.register('joinsDesignerJoinTreesTreeSidebarStore', new JoinsDesignerJoinTreesTreeSidebarStore(joinsDesignerViewModelOptions));
  context.register('selectOptionsWithAdditionalPropsFactory', new SelectOptionsWithAdditionalPropsFactory({
    className: options.dialogs.constantJoinExpressionEditor.selectOptionClassName
  }));
  context.register('constantJoinExpressionDialogStore', new ConstantJoinExpressionDialogStore({}));
};

});