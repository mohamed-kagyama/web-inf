define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinsEnum = require("../../../../model/enum/joinsEnum");

var joinWeightsEnum = require("../enum/joinWeightsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(joinConstructor, resource) {
    joinConstructor = _.extend({}, joinConstructor, {
      rightSide: _.extend({}, joinConstructor.rightSide, {
        tableReferenceId: resource.parentTableReferenceId,
        fieldId: resource.id
      })
    });
    var leftDroppableArea = joinConstructor.leftSide,
        rightDroppableArea = joinConstructor.rightSide;
    return {
      leftTableReferenceId: leftDroppableArea.tableReferenceId,
      rightTableReferenceId: rightDroppableArea.tableReferenceId,
      joinTreeId: joinConstructor.joinTreeId,
      joinType: joinsEnum.joinTypes.inner.name,
      joinWeight: joinWeightsEnum.defaultOption.value,
      expression: {
        leftFieldId: leftDroppableArea.fieldId,
        rightFieldId: rightDroppableArea.fieldId,
        operator: joinsEnum.joinOperators.equals.name
      }
    };
  }
};

});