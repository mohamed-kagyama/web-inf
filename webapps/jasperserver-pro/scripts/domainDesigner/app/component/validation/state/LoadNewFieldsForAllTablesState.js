define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var LoadNewFieldsForAllTablesState = function LoadNewFieldsForAllTablesState(options) {
  this.initialize(options);
};

_.extend(LoadNewFieldsForAllTablesState.prototype, {
  initialize: function initialize(options) {
    this.metadataService = options.metadataService;
    this.validationMetadataService = options.validationMetadataService;
    this.domainValidationMutations = options.domainValidationMutations;
    this.clientDomainValidationService = options.clientDomainValidationService;
    this.dataSourceMetadataToDTOConverter = options.dataSourceMetadataToDTOConverter;
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
  },
  enter: function enter(context, stateFactory) {
    var self = this;

    this._loadNewFieldsForAllTables(context).then(function (fieldGroups) {
      self.domainValidationMutations.addNewFields(fieldGroups);

      if (context.initialState === validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE) {
        stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_AFTER_VALIDATION_ERROR_IS_RESOLVED_STATE, context);
      } else {
        stateFactory.enter(validationStateNameEnum.SET_DOMAIN_DESIGNER_STATE_WITH_CURRENT_DESIGNER_STATE, context);
      }
    });
  },
  _loadNewFieldsForAllTables: function _loadNewFieldsForAllTables(context) {
    var isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    var dataSourceUri = this.clientDomainValidationService.getDataSource().uri,
        resources = this.clientDomainValidationService.getAllTablesWithPath({
      isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute: isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute
    });
    return this._getMetadataAndFilterOnlyTablesWithNewFields(dataSourceUri, resources, context);
  },
  _getMetadataAndFilterOnlyTablesWithNewFields: function _getMetadataAndFilterOnlyTablesWithNewFields(dataSourceUri, resources, context) {
    var self = this,
        dfd = new $.Deferred().resolve([]);

    var resourcesPaths = _.map(resources, function (resource) {
      return resource.tablePath;
    });

    if (resources.length > 0) {
      var metadataService = this.metadataService;

      if (context.initialState === validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE) {
        metadataService = this.validationMetadataService;
      }

      dfd = metadataService.getMetadata(dataSourceUri, resourcesPaths).then(function (data) {
        var fieldsGroups = self.clientDomainValidationService.filterOnlyTablesWithNewFields(data || [], resources);
        return fieldsGroups.map(function (fieldsGroup) {
          return {
            parentId: fieldsGroup.parentId,
            fields: self.dataSourceMetadataToDTOConverter.toTableChildrenDTO(fieldsGroup.fields)
          };
        });
      });
    }

    return dfd;
  }
});

module.exports = LoadNewFieldsForAllTablesState;

});