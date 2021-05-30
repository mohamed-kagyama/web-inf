define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification = function JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification.prototype, {
  initialize: function initialize(options) {
    this.isDraftJoinTreeOrJoinConstructorExistSpecification = options.isDraftJoinTreeOrJoinConstructorExistSpecification;
    this.canResourceParticipateInJoinSpecification = options.canResourceParticipateInJoinSpecification;
    this.canResourceBeReorderedSpecification = options.canResourceBeReorderedSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    if (this.canResourceBeReorderedSpecification.isSatisfiedBy(options)) {
      return true;
    } else if (this.isDraftJoinTreeOrJoinConstructorExistSpecification.isSatisfied()) {
      return false;
    } else {
      return this.canResourceParticipateInJoinSpecification.isSatisfiedBy(options);
    }
  }
});

module.exports = JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification;

});