define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var defaultSchemaNameEnum = require("../../../../model/enum/defaultSchemaNameEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy = function MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.sourceTreeSelectionProvider = options.sourceTreeSelectionProvider;
    this.resourcesParentIdProvider = options.resourcesParentIdProvider;
  },
  execute: function execute(resources) {
    var eventOptions = this._getEventOptions(resources),
        event = applicationStateEventsEnum.METADATA_DESIGNER_REMOVE_SCHEMAS_AND_DEFAULT_SCHEMA_CHILDREN;

    this.applicationDispatcherEventBus.trigger(event, eventOptions);
  },
  _getEventOptions: function _getEventOptions(resources) {
    var parentId = this.resourcesParentIdProvider.getParentId();

    var eventOptions = _.reduce(resources, function (memo, resource) {
      if (resource.name === defaultSchemaNameEnum.DEFAULT_SCHEMA) {
        memo.defaultSchemaId = resource.id;
      } else {
        memo.dataSourceGroupIds.push(resource.id);
      }

      return memo;
    }, {
      defaultSchemaId: null,
      dataSourceGroupIds: []
    }, this);

    return _.extend({}, eventOptions, {
      dataSourceGroupsParentId: parentId,
      sourceTreeSelection: this.sourceTreeSelectionProvider.getSelection(resources),
      resultTreeSelection: []
    });
  }
});

module.exports = MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy;

});