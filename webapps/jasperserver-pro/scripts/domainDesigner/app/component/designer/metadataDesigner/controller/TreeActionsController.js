define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var resourceTypeEnum = require("../../../../model/enum/resourceTypeEnum");

var resourcesWithChildrenPredicate = require("./predicate/resourcesWithChildrenPredicate");

var defaultSchemaNameEnum = require("../../../../model/enum/defaultSchemaNameEnum");

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeActionsController = function TreeActionsController(options) {
  this.sourceTree = options.sourceTree;
  this.sourceTreeDataProvider = options.sourceTreeDataProvider;
  this.resultTree = options.resultTree;
  this.resultTreeDataProvider = options.resultTreeDataProvider;
  this.metadataDesignerEventBus = options.metadataDesignerEventBus;
  this.storeChangeEventBus = options.storeChangeEventBus;
  this.model = options.model || new Backbone.Model();
  this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  this.clientDomainSchemaMetadataService = options.clientDomainSchemaMetadataService;
  this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
  this.metadataDesignerResourcesParentIdProvider = options.metadataDesignerResourcesParentIdProvider;
  this.addFetchedResourcesToSchemaStrategy = options.addFetchedResourcesToSchemaStrategy;
  this.metadataFetchStrategy = options.metadataFetchStrategy;
  this.metadataDesignerRemoveSelectedResourcesStrategy = options.metadataDesignerRemoveSelectedResourcesStrategy;
  this.metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy = options.metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy;

  this._initEvents();
};

_.extend(TreeActionsController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._setViewModelState);
    this.listenTo(this.metadataDesignerEventBus, 'sourceList:drop', this._getTreeSelectionAndRemoveMetadataResourcesFromSchema);
    this.listenTo(this.metadataDesignerEventBus, 'resultList:drop', this._getTreeSelectionAndAddMetadataResourcesToSchema);
    this.listenTo(this.sourceTree, 'item:dblclick', this._getTreeSelectionAndAddMetadataResourcesToSchema);
    this.listenTo(this.resultTree, 'item:dblclick', this._getTreeSelectionAndRemoveMetadataResourcesFromSchema);
    this.listenTo(this.metadataDesignerEventBus, 'moveToSource', this._getTreeSelectionAndRemoveMetadataResourcesFromSchema);
    this.listenTo(this.metadataDesignerEventBus, 'moveToResult', this._getTreeSelectionAndAddMetadataResourcesToSchema);
  },
  _setViewModelState: function _setViewModelState(state) {
    var currentSidebarResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource(),
        currentDataSource = this.clientDomainSchemaMetadataService.getDataSourceByChildResource(currentSidebarResource.resourceId, currentSidebarResource.type),
        currentMetadataResourcePath = this.clientDomainSchemaMetadataService.getResourcePath(currentSidebarResource.resourceId, currentSidebarResource.type),
        currentDataSourceUri = this.clientResourcePropertiesService.getDataSourceUri(currentDataSource.name),
        dataSourceType = state.viewState.getDataSource(currentDataSource.name).type;
    this.model.set({
      currentMetadataResourceId: currentSidebarResource.resourceId,
      currentDataSourceId: currentDataSource.id,
      currentMetadataResourcePath: currentMetadataResourcePath,
      currentDataSourceUri: currentDataSourceUri,
      currentDataSourceType: dataSourceType
    });
  },
  _getTreeSelectionAndAddMetadataResourcesToSchema: function _getTreeSelectionAndAddMetadataResourcesToSchema() {
    var self = this;
    this.sourceTreeDataProvider.getSelectedResources().then(function (resources) {
      self._onAddMetadataResourcesToSchema(resources);
    });
  },
  _getTreeSelectionAndRemoveMetadataResourcesFromSchema: function _getTreeSelectionAndRemoveMetadataResourcesFromSchema() {
    var resources = this.resultTreeDataProvider.getSelectedResources();

    this._removeMetadataResourcesFromSchema(resources);
  },
  _removeMetadataResourcesFromSchema: function _removeMetadataResourcesFromSchema(resources) {
    if (_.size(resources) === 0) {
      return;
    }

    var metadataResourcesType = this._getMetadataResourcesType(resources),
        isDefaultSchemaBeingDeleted = this._isDefaultSchemaBeingDeleted({
      type: metadataResourcesType,
      resources: resources
    });

    if (isDefaultSchemaBeingDeleted) {
      this.metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy.execute(resources);
    } else {
      this.metadataDesignerRemoveSelectedResourcesStrategy.execute({
        type: metadataResourcesType,
        resources: resources
      });
    }
  },
  _onAddMetadataResourcesToSchema: function _onAddMetadataResourcesToSchema(resources) {
    if (_.size(resources) === 0) {
      return;
    }

    var metadataResourcesType = this._getMetadataResourcesType(resources),
        parentId = this.metadataDesignerResourcesParentIdProvider.getParentId(),
        self = this;

    this._fetchSubResources(resources, metadataResourcesType).then(function (fetchedResources) {
      var modelJSON = self.model.toJSON();
      return {
        fetchedResources: fetchedResources,
        metadataResourcesType: metadataResourcesType,
        parentId: parentId,
        dataSourceId: modelJSON.currentDataSourceId,
        dataSourceType: modelJSON.currentDataSourceType
      };
    }).then(function (options) {
      var existingResources = self._getExistingResources(options, resources),
          someResourcesAreMissing = existingResources.length !== resources.length,
          resourcesWithChildren = self._getResourcesWithChildren({
        existingResources: existingResources,
        metadataResourcesType: options.metadataResourcesType
      }),
          someResourcesAreChildLess = resourcesWithChildren.length !== existingResources.length;

      if (someResourcesAreMissing || someResourcesAreChildLess) {
        self.metadataDesignerEventBus.trigger('fetchSubResource:invalidResources', _.extend({
          selectedResources: resources
        }, options, {
          resourcesWithChildren: resourcesWithChildren,
          someResourcesAreMissing: someResourcesAreMissing,
          someResourcesAreChildLess: someResourcesAreChildLess
        }));
      } else {
        self.addFetchedResourcesToSchemaStrategy.execute(options);
      }
    }).fail(function (xhr) {
      self.metadataDesignerEventBus.trigger('fetchSubResource:fail', {
        xhr: xhr,
        selectedResources: resources,
        metadataResourcesType: metadataResourcesType
      });
    });
  },
  _getResourcesWithChildren: function _getResourcesWithChildren(options) {
    var resources = options.existingResources,
        resourceType = options.metadataResourcesType;

    if (entityUtil.isDataSourceGroup(resourceType)) {
      return resources;
    }

    return _.filter(resources, resourcesWithChildrenPredicate);
  },
  _getExistingResources: function _getExistingResources(options, selectedResources) {
    var selectedResourcesMap = selectedResources.reduce(function (memo, resource) {
      memo[resource.name] = true;
      return memo;
    }, {});
    return options.fetchedResources.filter(function (resource) {
      return selectedResourcesMap[resource[resourceTypeEnum.resources.groups.GROUP].name];
    });
  },
  _fetchSubResources: function _fetchSubResources(resources, resourceType) {
    return this.metadataFetchStrategy.fetch({
      resources: resources,
      resourceType: resourceType,
      parentId: this.model.get('currentMetadataResourceId'),
      parentPath: this.model.get('currentMetadataResourcePath'),
      dataSourceUri: this.model.get('currentDataSourceUri'),
      dataSourceId: this.model.get('currentDataSourceId')
    });
  },
  _getMetadataResourcesType: function _getMetadataResourcesType(resources) {
    return _.first(resources).type;
  },
  _isDefaultSchemaBeingDeleted: function _isDefaultSchemaBeingDeleted(options) {
    var type = options.type,
        resources = options.resources;
    return entityUtil.isDataSourceGroup(type) && _.find(resources, function (resource) {
      return resource.name === defaultSchemaNameEnum.DEFAULT_SCHEMA;
    });
  }
});

module.exports = TreeActionsController;

});