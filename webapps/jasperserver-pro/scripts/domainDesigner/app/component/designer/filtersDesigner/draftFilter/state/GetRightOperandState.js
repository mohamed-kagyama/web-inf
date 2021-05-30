define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftFilterStateEnum = require("../enum/draftFilterStateEnum");

var genericTypesEnum = require("../../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var GetRightOperandState = function GetRightOperandState(options) {
  this.rightOperandValueEnum = options.rightOperandValueEnum;
  this.validatorConfig = options.validatorConfig;
};

_.extend(GetRightOperandState.prototype, {
  enter: function enter(context, stateFactory) {
    var rightOperandContext = this._getRightOperandContext(context);

    this._getRightOperandAndSwitchToNextState(context, stateFactory, rightOperandContext);
  },
  _getRightOperandContext: function _getRightOperandContext(context) {
    return _.extend({}, context, {
      validatorConfig: this.validatorConfig
    });
  },
  _getRightOperandAndSwitchToNextState: function _getRightOperandAndSwitchToNextState(context, stateFactory, rightOperandContext) {
    var defaultValueFactory = this._getValueFactory(context);

    var contextClone = _.cloneDeep(context);

    contextClone.newFilterOptions.rightOperand = defaultValueFactory(rightOperandContext);
    stateFactory.enter(draftFilterStateEnum.FINAL_STATE, contextClone);
  },
  _getValueFactory: function _getValueFactory(context) {
    var dataType = context.currentFilter.dataType,
        newFilterOptions = context.newFilterOptions;

    if (!dataType) {
      dataType = genericTypesEnum.STRING;
    }

    return this._getValueFactoryByOptions({
      dataType: dataType,
      rightOperandType: newFilterOptions.rightOperandType,
      operator: newFilterOptions.operator
    });
  },
  _getValueFactoryByOptions: function _getValueFactoryByOptions(options) {
    var dataType = options.dataType,
        rightOperandType = options.rightOperandType,
        operator = options.operator;
    var byDataTypeEnum = this.rightOperandValueEnum[dataType],
        byOperandTypeEnum = byDataTypeEnum[rightOperandType];
    return byOperandTypeEnum[operator];
  }
});

module.exports = GetRightOperandState;

});