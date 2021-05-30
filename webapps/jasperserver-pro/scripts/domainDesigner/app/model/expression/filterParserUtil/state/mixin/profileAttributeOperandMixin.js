define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var profileAttributeUtil = require("../../../../../../model/util/profileAttributeUtil");

var isProfileAttributeOperandCastedSpecification = require("../specification/isProfileAttributeOperandCastedSpecification");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _addProfileAttributeObjectToContext: function _addProfileAttributeObjectToContext(operand) {
    var operands = operand.operands;

    if (isProfileAttributeOperandCastedSpecification.isSatisfiedBy(operand)) {
      operands = operands[0]["function"].operands;
    }

    this.context.profileAttribute = {
      operandsQuantity: operands.length,
      operands: []
    };
  },
  _addProfileAttributeFnOperand: function _addProfileAttributeFnOperand(value) {
    var operands = this.context.profileAttribute.operands;
    operands.push(value);
  },
  _getProfileAttributeString: function _getProfileAttributeString() {
    var operands = this.context.profileAttribute.operands,
        operandsQuantity = this.context.profileAttribute.operandsQuantity;

    if (operands.length === operandsQuantity) {
      return profileAttributeUtil.createProfileAttributeFunctionWithArgs(operands);
    }
  }
};

});