define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AddFetchedResourcesToSchemaStrategy = function AddFetchedResourcesToSchemaStrategy(options) {
  this.initialize(options);
};

_.extend(AddFetchedResourcesToSchemaStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.metadataToDTOConverter = options.metadataToDTOConverter;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.metadataDesignerDispatcherActionNameProvider = options.metadataDesignerDispatcherActionNameProvider;
  },
  execute: function execute(options) {
    var metadataResourcesType = options.metadataResourcesType,
        parentId = options.parentId,
        actionName = this.metadataDesignerDispatcherActionNameProvider.getAddEventByResourceType(metadataResourcesType),
        selectedResources = options.selectedResources || [];

    var resourcesToAdd = this._convertFetchedResourcesToDTO(options),
        areDataSourceGroupBeingAdded = entityUtil.isDataSourceGroup(metadataResourcesType),
        areTablesBeingAdded = entityUtil.isTable(metadataResourcesType);

    var resultTreeSelection = this._getResultTreeSelection({
      areDataSourceGroupBeingAdded: areDataSourceGroupBeingAdded,
      areTablesBeingAdded: areTablesBeingAdded,
      resourcesToAdd: resourcesToAdd
    }),
        sourceTreeSelection = this._getSourceTreeSelection({
      areDataSourceGroupBeingAdded: areDataSourceGroupBeingAdded,
      areTablesBeingAdded: areTablesBeingAdded,
      selectedResources: selectedResources,
      resourcesToAdd: resourcesToAdd
    });

    this.applicationDispatcherEventBus.trigger(actionName, {
      resources: resourcesToAdd,
      parentId: parentId,
      sourceTreeSelection: sourceTreeSelection || [],
      resultTreeSelection: resultTreeSelection || [],
      addResourcesError: {
        popoverMessage: options.popoverMessage || '',
        highlightInvalidResources: options.highlightInvalidResources || false
      }
    });
  },
  _convertFetchedResourcesToDTO: function _convertFetchedResourcesToDTO(options) {
    var resourceType = options.metadataResourcesType;
    var converterOptions = {
      resources: options.fetchedResources,
      parentId: options.parentId,
      dataSourceId: options.dataSourceId
    };

    if (entityUtil.isDataSourceGroup(resourceType)) {
      return this.metadataToDTOConverter.toSchemasDTO(converterOptions);
    } else if (entityUtil.isTable(resourceType)) {
      return this.metadataToDTOConverter.toTablesAndReferencesDTO(converterOptions);
    }
  },
  _getSourceTreeSelection: function _getSourceTreeSelection(options) {
    var selectedResources = options.selectedResources,
        resourcesToAdd = options.resourcesToAdd,
        areTablesBeingAdded = options.areTablesBeingAdded,
        areDataSourceGroupBeingAdded = options.areDataSourceGroupBeingAdded;
    var resourcesToAddNames = [];

    if (areTablesBeingAdded) {
      resourcesToAddNames = _.map(resourcesToAdd, function (resource) {
        return resource.table.sourceName || resource.table.name;
      });
    }

    if (areDataSourceGroupBeingAdded) {
      resourcesToAddNames = _.map(resourcesToAdd, function (resource) {
        return resource.sourceName || resource.name;
      });
    }

    return _.reduce(selectedResources, function (memo, resource) {
      if (_.indexOf(resourcesToAddNames, resource.name) === -1) {
        memo.push(resource.name);
      }

      return memo;
    }, []);
  },
  _getResultTreeSelection: function _getResultTreeSelection(options) {
    var resourcesToAdd = options.resourcesToAdd,
        areTablesBeingAdded = options.areTablesBeingAdded,
        areDataSourceGroupBeingAdded = options.areDataSourceGroupBeingAdded;
    var selection = [];

    if (areTablesBeingAdded) {
      selection = _.map(resourcesToAdd, function (resource) {
        return resource.table.name;
      });
    }

    if (areDataSourceGroupBeingAdded) {
      selection = _.map(resourcesToAdd, function (resource) {
        return resource.name;
      });
    }

    return selection;
  }
});

module.exports = AddFetchedResourcesToSchemaStrategy;

});