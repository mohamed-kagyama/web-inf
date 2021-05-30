define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var artificialTreeResourceTypesEnum = require("../enum/artificialTreeResourceTypesEnum");

var CompositePredicate = require("../../../../../util/predicate/CompositePredicate");

var baseSidebarTreeConverter = require("./baseSidebarTreeConverter");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var CONSTANT_GROUP = {
  id: artificialTreeResourceTypesEnum.CONSTANT_GROUP,
  name: i18nMessage('domain.designer.calcFields.sidebar.constantGroup'),
  type: artificialTreeResourceTypesEnum.CONSTANT_GROUP
};

var ConstantGroupToNestedTreeModelConverter = function ConstantGroupToNestedTreeModelConverter(options) {
  this.initialize(options);
};

_.extend(ConstantGroupToNestedTreeModelConverter.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.resourceMatch = options.resourceMatch;
    this.resourceOrChildrenMatch = options.resourceOrChildrenMatch;
    this.resourceJsonMatch = options.resourceJsonMatch;
    this.convertResource = options.convertResource;
    this.convertResourceNoChildren = options.convertResourceNoChildren;
    this.convertChildrenMatch = options.convertChildrenMatch;
    this.childrenProperty = options.childrenProperty;
    this.doNotSkipResourceConversion = options.doNotSkipResourceConversion;
    this.postProcess = options.postProcess;
    this.comparator = options.comparator;
  },
  convert: function convert(options) {
    var schema = options.schema;
    var allConstants = schema.constantGroups.reduce(function (memo, constantGroup) {
      return memo.concat(constantGroup.getCalcFields().toArray());
    }, []);

    var constantGroupResource = this._createConstantGroupResource(allConstants);

    return baseSidebarTreeConverter.convertResources([constantGroupResource], _.extend({}, {
      parentMatchResult: false,
      resourceMatch: this.resourceMatch,
      resourceOrChildrenMatch: this.resourceOrChildrenMatch,
      resourceJsonMatch: new CompositePredicate([this.resourceJsonMatch, Boolean(allConstants.length)]).match,
      convertResource: this.convertResource.convert,
      convertResourceNoChildren: this.convertResourceNoChildren.convert,
      doNotSkipResourceConversion: this.doNotSkipResourceConversion,
      convertChildrenMatch: this.convertChildrenMatch,
      childrenProperty: this.childrenProperty,
      postProcess: this.postProcess,
      comparator: this.comparator
    }, options));
  },
  _createConstantGroupResource: function _createConstantGroupResource(constants) {
    return _.extend({}, CONSTANT_GROUP, {
      children: constants
    });
  }
});

module.exports = ConstantGroupToNestedTreeModelConverter;

});