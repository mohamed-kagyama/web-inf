define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourceDroppableIntoCanvasDroppableAreaSpecification = function IsResourceDroppableIntoCanvasDroppableAreaSpecification(options) {
  this.initialize(options);
};

_.extend(IsResourceDroppableIntoCanvasDroppableAreaSpecification.prototype, {
  initialize: function initialize(options) {},
  isSatisfiedBy: function isSatisfiedBy(resource) {
    return entityUtil.isField(resource.type);
  }
});

module.exports = IsResourceDroppableIntoCanvasDroppableAreaSpecification;

});