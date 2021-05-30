define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerRemoveSelectedResourcesStrategy = function MetadataDesignerRemoveSelectedResourcesStrategy(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerRemoveSelectedResourcesStrategy.prototype, {
  initialize: function initialize(options) {
    this.metadataDesignerDispatcherActionNameProvider = options.metadataDesignerDispatcherActionNameProvider;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.sourceTreeSelectionProvider = options.sourceTreeSelectionProvider;
    this.resourcesParentIdProvider = options.resourcesParentIdProvider;
  },
  execute: function execute(options) {
    var type = options.type,
        resources = options.resources;
    var actionName = this.metadataDesignerDispatcherActionNameProvider.getRemoveEventByResourceType(type),
        parentId = this.resourcesParentIdProvider.getParentId();
    this.applicationDispatcherEventBus.trigger(actionName, {
      ids: _.map(resources, function (resource) {
        return resource.id;
      }),
      parentId: parentId,
      sourceTreeSelection: this.sourceTreeSelectionProvider.getSelection(resources),
      resultTreeSelection: []
    });
  }
});

module.exports = MetadataDesignerRemoveSelectedResourcesStrategy;

});