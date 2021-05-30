define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var childrenPropertyEnum = require("./enum/childrenPropertyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter = function PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter(options) {
  this.initialize(options);
};

_.extend(PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.presentationItemDTONameGenerator = options.presentationItemDTONameGenerator;
    this.constantGroupConverter = options.constantGroupConverter;
  },
  convert: function convert(options) {
    var dataStore = this.clientDomainSchemaService.getDataStore();
    this.presentationItemDTONameGenerator.reset();
    return this.constantGroupConverter.convert(_.extend({
      schema: dataStore,
      childrenProperty: childrenPropertyEnum.CHILDREN_PROPERTY
    }, options));
  }
});

module.exports = PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter;

});