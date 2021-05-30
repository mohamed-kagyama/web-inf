define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification = function JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification.prototype, {
  initialize: function initialize(options) {
    this.joinsDesignerViewStateModelService = options.joinsDesignerViewStateModelService;
  },
  isSatisfied: function isSatisfied() {
    var draftJoinTree = this.joinsDesignerViewStateModelService.getDraftJoinTree(),
        joinConstructor = this.joinsDesignerViewStateModelService.getJoinConstructor();
    return Boolean(draftJoinTree || joinConstructor);
  }
});

module.exports = JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification;

});