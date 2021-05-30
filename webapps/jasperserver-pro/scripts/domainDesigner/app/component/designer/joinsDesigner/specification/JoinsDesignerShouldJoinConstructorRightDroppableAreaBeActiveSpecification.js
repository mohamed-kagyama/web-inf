define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification = function JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification.prototype, {
  initialize: function initialize(options) {
    this.domainSchemaSpecification = options.domainSchemaSpecification;
    this.canResourceParticipateInJoinSpecification = options.canResourceParticipateInJoinSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var joinConstructor = options.joinConstructor,
        currentSidebarResource = options.currentSidebarResource;
    var isResourceDroppable = this.canResourceParticipateInJoinSpecification.isSatisfiedBy({
      resource: {
        id: currentSidebarResource.resourceId,
        type: currentSidebarResource.type,
        calcFieldSourceType: currentSidebarResource.calcFieldSourceType,
        parentJoinTreeId: currentSidebarResource.parentJoinTreeId
      },
      joinTreeId: joinConstructor.joinTreeId
    });

    if (isResourceDroppable) {
      return this.domainSchemaSpecification.canCreateJoinExpression({
        leftTableReferenceId: joinConstructor.leftSide.tableReferenceId,
        rightTableReferenceId: currentSidebarResource.parentTableReferenceId,
        leftTableFieldId: joinConstructor.leftSide.fieldId,
        rightTableFieldId: currentSidebarResource.resourceId
      });
    } else {
      return false;
    }
  }
});

module.exports = JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification;

});