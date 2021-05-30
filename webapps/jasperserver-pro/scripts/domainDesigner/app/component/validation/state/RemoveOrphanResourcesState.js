define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var RemoveOrphanResourcesState = function RemoveOrphanResourcesState(options) {
  this.initialize(options);
};

_.extend(RemoveOrphanResourcesState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.entityCollector = options.entityCollector;
    this.dependenciesConverter = options.dependenciesConverter;
    this.domainValidationMutations = options.domainValidationMutations;
    this.dependenciesInspectorApplication = options.dependenciesInspectorApplication;
    this.clientDomainValidationService = options.clientDomainValidationService;
  },
  enter: function enter(context, stateFactory) {
    var orphanResources = context.orphanResources,
        replaceDataSourceActionOptions = {
      schemaPairs: context.schemaPairs,
      dataSource: this.clientDomainValidationService.getDataSource(),
      orphanResources: orphanResources
    };
    var entities = this.entityCollector.collectAffectedEntities('replaceDataSource', replaceDataSourceActionOptions);

    if (entities) {
      this._openDependenciesInspector({
        entities: entities,
        context: context,
        stateFactory: stateFactory,
        replaceDataSourceActionOptions: replaceDataSourceActionOptions
      });
    } else {
      this._replaceDataSourceAndLoadNewFieldsForTables({
        context: context,
        stateFactory: stateFactory,
        replaceDataSourceActionOptions: replaceDataSourceActionOptions
      });
    }
  },
  _openDependenciesInspector: function _openDependenciesInspector(options) {
    var entities = options.entities,
        context = options.context,
        stateFactory = options.stateFactory,
        replaceDataSourceActionOptions = options.replaceDataSourceActionOptions;
    var dependenciesGroups = this.dependenciesConverter.convert(entities, {
      targetEntityType: schemaEntitiesEnum.DATA_SOURCE,
      targetEntitiesIds: [],
      isReplaceDataSource: true
    }) || {};

    var areBothGroupsEmpty = _.isEmpty(dependenciesGroups.leftGroup) && _.isEmpty(dependenciesGroups.rightGroup);

    if (areBothGroupsEmpty) {
      this._replaceDataSourceAndLoadNewFieldsForTables({
        context: context,
        stateFactory: stateFactory,
        replaceDataSourceActionOptions: replaceDataSourceActionOptions
      });
    } else {
      this.listenTo(this.dependenciesInspectorApplication, 'confirm', _.bind(this._onChangeConfirmed, this, {
        context: context,
        stateFactory: stateFactory,
        replaceDataSourceActionOptions: replaceDataSourceActionOptions
      }));
      this.listenTo(this.dependenciesInspectorApplication, 'reject', _.bind(this._closeDependenciesInspector, this, {
        context: context,
        stateFactory: stateFactory
      }));
      this.dependenciesInspectorApplication.open(dependenciesGroups);
    }
  },
  _onChangeConfirmed: function _onChangeConfirmed(options) {
    this.stopListening(this.dependenciesInspectorApplication);
    this.dependenciesInspectorApplication.close();

    this._replaceDataSourceAndLoadNewFieldsForTables(options);
  },
  _closeDependenciesInspector: function _closeDependenciesInspector(options) {
    this.stopListening(this.dependenciesInspectorApplication);
    this.dependenciesInspectorApplication.close();
    options.stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, options.context);
  },
  _replaceDataSourceAndLoadNewFieldsForTables: function _replaceDataSourceAndLoadNewFieldsForTables(options) {
    var context = options.context,
        stateFactory = options.stateFactory;
    this.domainValidationMutations.replaceDataSource(options.replaceDataSourceActionOptions);
    stateFactory.enter(validationStateNameEnum.LOAD_NEW_FIELDS_FOR_ALL_TABLES_STATE, context);
  }
});

module.exports = RemoveOrphanResourcesState;

});