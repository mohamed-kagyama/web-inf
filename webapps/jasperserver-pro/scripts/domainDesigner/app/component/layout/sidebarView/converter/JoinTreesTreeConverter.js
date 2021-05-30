define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var baseSidebarTreeConverter = require("./baseSidebarTreeConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinTreesToTreeStructureConverter = function JoinTreesToTreeStructureConverter(options) {
  this.initialize(options);
};

_.extend(JoinTreesToTreeStructureConverter.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.resourceMatch = options.resourceMatch;
    this.resourceOrChildrenMatch = options.resourceOrChildrenMatch;
    this.resourceJsonMatch = options.resourceJsonMatch;
    this.resourceConverter = options.resourceConverter;
    this.convertResource = options.convertResource;
    this.convertResourceNoChildren = options.convertResourceNoChildren;
    this.doNotSkipResourceConversion = options.doNotSkipResourceConversion;
    this.convertChildrenMatch = options.convertChildrenMatch;
    this.postProcess = options.postProcess;
    this.comparator = options.comparator;
  },
  convert: function convert(options) {
    var schema = options.schema,
        joinTrees = options.joinTrees || schema.joinTrees;
    return baseSidebarTreeConverter.convertResources(joinTrees, _.extend({}, {
      parentMatchResult: false,
      resourceMatch: this.resourceMatch,
      resourceOrChildrenMatch: this.resourceOrChildrenMatch,
      resourceJsonMatch: this.resourceJsonMatch,
      convertResource: this.convertResource.convert,
      convertResourceNoChildren: this.convertResourceNoChildren.convert,
      convertChildrenMatch: this.convertChildrenMatch,
      doNotSkipResourceConversion: this.doNotSkipResourceConversion,
      childrenProperty: this.childrenProperty,
      postProcess: this.postProcess,
      comparator: this.comparator
    }, options));
  }
});

module.exports = JoinTreesToTreeStructureConverter;

});