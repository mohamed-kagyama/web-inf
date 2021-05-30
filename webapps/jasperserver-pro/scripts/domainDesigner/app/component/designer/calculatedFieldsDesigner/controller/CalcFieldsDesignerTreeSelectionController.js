define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var selectionMixin = require("../../../../common/mixin/selection/selectionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CalcFieldsDesignerTreeSelectionController = function CalcFieldsDesignerTreeSelectionController(options) {
  this.initialize(options);
};

_.extend(CalcFieldsDesignerTreeSelectionController.prototype, {
  selection: {
    event: 'click dblclick',
    selector: 'li',
    attrs: ['id'],
    onSelection: 'selectItem',
    shouldBeSelectable: 'shouldBeSelectable'
  },
  initialize: function initialize(options) {
    this.$el = options.tree.$el;
    this.tree = options.tree;
    this.nestedTreeModel = options.nestedTreeModel;
    this.calculatedFieldsDesignerEventBus = options.calculatedFieldsDesignerEventBus;
    this._initializeSelectable && this._initializeSelectable();
  },
  selectItem: function selectItem(item, event) {
    var treeItem = this.nestedTreeModel.getNode(item.id),
        resource = treeItem.resource;

    if (entityUtil.isField(resource.type)) {
      this.tree.setValue([item.id]);

      if (event.type === 'dblclick') {
        this.calculatedFieldsDesignerEventBus.trigger('designer:addVariableNameToExpression', resource.variableName);
      }
    }
  }
}, selectionMixin);

module.exports = CalcFieldsDesignerTreeSelectionController;

});