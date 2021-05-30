define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification = function JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification.prototype, {
  initialize: function initialize(options) {
    this.isDraftJoinTreeOrJoinConstructorExistSpecification = options.isDraftJoinTreeOrJoinConstructorExistSpecification;
    this.canResourceParticipateInJoinSpecification = options.canResourceParticipateInJoinSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    if (this.isDraftJoinTreeOrJoinConstructorExistSpecification.isSatisfied()) {
      return false;
    } else {
      return this.canResourceParticipateInJoinSpecification.isSatisfiedBy(options);
    }
  }
});

module.exports = JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification;

});