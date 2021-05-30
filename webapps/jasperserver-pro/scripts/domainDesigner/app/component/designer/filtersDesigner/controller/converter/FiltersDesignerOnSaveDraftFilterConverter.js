define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var operandSideEnum = require("../../enum/operandSideEnum");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerOnSaveDraftFilterConverter = function FiltersDesignerOnSaveDraftFilterConverter(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerOnSaveDraftFilterConverter.prototype, {
  initialize: function initialize(options) {
    this.onSaveDraftFilterSourceByExpressionProvider = options.onSaveDraftFilterSourceByExpressionProvider;
    this.filtersDesignerDraftFilterRightOperandConverter = options.filtersDesignerDraftFilterRightOperandConverter;
  },
  convert: function convert(draftFilter) {
    var filterSource = this.onSaveDraftFilterSourceByExpressionProvider.getSource(draftFilter.expression);
    draftFilter = _.cloneDeep(draftFilter);
    draftFilter = this._updateFilterRightOperandValue(draftFilter);
    draftFilter = this._updateOperandsSourceByFilterSource(draftFilter, filterSource);
    return _.extend({}, draftFilter, filterSource);
  },
  _updateFilterRightOperandValue: function _updateFilterRightOperandValue(draftFilter) {
    var rightOperand = this.filtersDesignerDraftFilterRightOperandConverter.convert(draftFilter.expression.right, {
      dataType: draftFilter.dataType
    });

    if (!_.isUndefined(rightOperand)) {
      draftFilter.expression.right = rightOperand;
    }

    return draftFilter;
  },
  _updateOperandsSourceByFilterSource: function _updateOperandsSourceByFilterSource(draftFilter, filterSource) {
    if (entityUtil.isJoinTree(filterSource.sourceType)) {
      return draftFilter;
    }

    draftFilter = this._updateOperandSourceByFilterSource({
      operandSide: operandSideEnum.LEFT,
      draftFilter: draftFilter,
      filterSource: filterSource
    });
    draftFilter = this._updateOperandSourceByFilterSource({
      operandSide: operandSideEnum.RIGHT,
      draftFilter: draftFilter,
      filterSource: filterSource
    });
    return draftFilter;
  },
  _updateOperandSourceByFilterSource: function _updateOperandSourceByFilterSource(options) {
    var operandSide = options.operandSide,
        draftFilter = options.draftFilter,
        operand = draftFilter.expression[operandSide],
        filterSource = options.filterSource;

    if (filterOperandTypeUtil.isVariable(operand.type) && !entityUtil.isConstantGroup(operand.sourceType)) {
      draftFilter.expression[operandSide] = _.extend({}, draftFilter.expression[operandSide], filterSource);
    }

    return draftFilter;
  }
});

module.exports = FiltersDesignerOnSaveDraftFilterConverter;

});