define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var dataSourceTypeEnum = require("../../../model/enum/dataSourceTypeEnum");

var defaultSchemaNameEnum = require("../../../model/enum/defaultSchemaNameEnum");

var profileAttributeUtil = require("../../../../model/util/profileAttributeUtil");

var specialSchemaNamesEnum = require('../../../../model/schema/enum/specialSchemaNamesEnum');

var schemaMappingType = require("../schemaMapping/enum/schemaMappingType");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SCHEMALESS_NAME_SUBSTITUTION = specialSchemaNamesEnum.SCHEMALESS_NAME_SUBSTITUTION;

var MapSchemasState = function MapSchemasState(options) {
  this.initialize(options);
};

_.extend(MapSchemasState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.schemaMappingModel = options.schemaMappingModel;
    this.schemaMappingDialog = options.schemaMappingDialog;
    this.domainValidationEventBus = options.domainValidationEventBus;
    this.defaultSchemaExistsAndNotEmptySpecification = options.defaultSchemaExistsAndNotEmptySpecification;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.clientDomainValidationService = options.clientDomainValidationService;
    this.clientCurrentDesignerStateService = options.clientCurrentDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var dataSourceGroups = this.clientDomainSchemaService.getDataSourceGroups();
    context.existingSchemasToMap = this._getExistingSchemasToMap(dataSourceGroups);

    var autoResolvedPairs = this.clientDomainValidationService.tryAutoresolveSchemas({
      existingSchemas: context.existingSchemasToMap,
      availableSchemas: context.availableSchemasToMap
    }),
        isEmptyDomainBasedOnDataSourceWithSchemas = this._isEmptyDomainBasedOnDataSourceWithSchemas(),
        isSchemaLessDataSources = this._isSchemaLessDataSources(dataSourceGroups);

    if (autoResolvedPairs || isEmptyDomainBasedOnDataSourceWithSchemas || isSchemaLessDataSources) {
      context.schemaPairs = autoResolvedPairs;
      stateFactory.enter(validationStateNameEnum.DOMAIN_VALIDATION_STATE, context);
    } else {
      this._openSchemaMappingDialog(context, stateFactory);
    }
  },
  _isEmptyDomainBasedOnDataSourceWithSchemas: function _isEmptyDomainBasedOnDataSourceWithSchemas() {
    var currentDataSourceType = this.clientCurrentDesignerStateService.getDataSourceType(),
        isEmptyDomain = _.isEmpty(this.clientDomainValidationService.getAllSchemasSourceNamesOrNames());

    var isCurrentDataSourceWithSchemas = currentDataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS;
    return isCurrentDataSourceWithSchemas && isEmptyDomain;
  },
  _isSchemaLessDataSources: function _isSchemaLessDataSources(dataSourceGroups) {
    var currentDataSourceType = this.clientCurrentDesignerStateService.getDataSourceType(),
        targetDataSourceType = this.clientDomainValidationService.getDataSource().type;
    var isCurrentDataSourceWithoutSchemas; // in case we cannot retrieve data source type we check schema
    // for data source groups presence

    if (currentDataSourceType) {
      isCurrentDataSourceWithoutSchemas = currentDataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS;
    } else {
      isCurrentDataSourceWithoutSchemas = dataSourceGroups.length === 0;
    }

    var isTargetDataSourceWithoutSchemas = targetDataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS;
    return isCurrentDataSourceWithoutSchemas && isTargetDataSourceWithoutSchemas;
  },
  _getExistingSchemasToMap: function _getExistingSchemasToMap(dataSourceGroups) {
    var defaultSchemaExistsAndNotEmpty = this.defaultSchemaExistsAndNotEmptySpecification.isSatisfied();

    var schemas = _.reduce(dataSourceGroups, function (memo, dataSourceGroup) {
      var dataSourceGroupName = dataSourceGroup.sourceName || dataSourceGroup.name,
          isDefaultSchema = dataSourceGroup.name === defaultSchemaNameEnum.DEFAULT_SCHEMA,
          isNotAProfileAttributeSchema = !profileAttributeUtil.containsProfileAttributeWithPlaceholders(dataSourceGroupName);

      if (isDefaultSchema) {
        if (defaultSchemaExistsAndNotEmpty) {
          memo.push(dataSourceGroupName);
        }
      } else if (isNotAProfileAttributeSchema) {
        memo.push(dataSourceGroupName);
      }

      return memo;
    }, []);

    return _.unique(schemas);
  },
  _getExistingAndAvailableSchemas: function _getExistingAndAvailableSchemas(context) {
    var existingSchemas = context.existingSchemasToMap,
        availableSchemas = context.availableSchemasToMap,
        isExistingSchemasEmpty = _.isEmpty(existingSchemas),
        isAvailableSchemaEmpty = _.isEmpty(availableSchemas);

    if (isExistingSchemasEmpty) {
      existingSchemas.push(SCHEMALESS_NAME_SUBSTITUTION);
    }

    if (isAvailableSchemaEmpty) {
      availableSchemas.push(SCHEMALESS_NAME_SUBSTITUTION);
    }

    existingSchemas = _.map(existingSchemas, function (schemaName) {
      return {
        name: schemaName,
        mappedWith: undefined,
        isSelected: false,
        index: 0,
        type: schemaMappingType.EXISTING
      };
    });
    availableSchemas = _.map(availableSchemas, function (schemaName) {
      return {
        name: schemaName,
        mappedWith: undefined,
        isSelected: false,
        index: 0,
        type: schemaMappingType.AVAILABLE
      };
    });
    return {
      existingSchemas: existingSchemas,
      availableSchemas: availableSchemas,
      isExistingSchemasEmpty: isExistingSchemasEmpty,
      isAvailableSchemaEmpty: isAvailableSchemaEmpty
    };
  },
  _openSchemaMappingDialog: function _openSchemaMappingDialog(context, stateFactory) {
    this._subscribeToSchemaMappingDialogEvents(context, stateFactory);

    var schemas = this._getExistingAndAvailableSchemas(context);

    this.schemaMappingModel.set({
      isSelectingAvailableSchema: schemas.isExistingSchemasEmpty,
      isSelectingExistingSchema: schemas.isAvailableSchemaEmpty,
      existingSchemas: schemas.existingSchemas,
      availableSchemas: schemas.availableSchemas,
      isVisible: true
    });
    this.schemaMappingModel.disableButtons();
    this.schemaMappingDialog.open();
  },
  _onSchemaMappingConfirmed: function _onSchemaMappingConfirmed(context, stateFactory) {
    this._unsubscribeToSchemaMappingDialogEventsAndCloseDialog();

    context.schemaPairs = this.schemaMappingModel.getMappedResult();
    stateFactory.enter(validationStateNameEnum.DOMAIN_VALIDATION_STATE, context);
  },
  _onSchemaItemClicked: function _onSchemaItemClicked(schemaClicked) {
    this.schemaMappingModel.updateSelection(schemaClicked);
  },
  _onLinkButtonClicked: function _onLinkButtonClicked() {
    this.schemaMappingModel.linkSelectedSchemas();
  },
  _onUnlinkButtonClicked: function _onUnlinkButtonClicked() {
    this.schemaMappingModel.unlinkSelectedSchemas();
  },
  _onCancel: function _onCancel(context, stateFactory) {
    this._unsubscribeToSchemaMappingDialogEventsAndCloseDialog();

    stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, context);
  },
  _subscribeToSchemaMappingDialogEvents: function _subscribeToSchemaMappingDialogEvents(context, stateFactory) {
    this.listenTo(this.domainValidationEventBus, 'schemaMappingDialog:confirm', _.bind(this._onSchemaMappingConfirmed, this, context, stateFactory));
    this.listenTo(this.domainValidationEventBus, 'schemaMappingDialog:reject', _.bind(this._onCancel, this, context, stateFactory));
    this.listenTo(this.schemaMappingDialog, 'dialog:close', _.bind(this._onCancel, this, context, stateFactory));
    this.listenTo(this.domainValidationEventBus, 'schemaMappingDialog:schemaItemClicked', this._onSchemaItemClicked);
    this.listenTo(this.domainValidationEventBus, 'schemaMappingDialog:linkButtonClicked', this._onLinkButtonClicked);
    this.listenTo(this.domainValidationEventBus, 'schemaMappingDialog:unlinkButtonClicked', this._onUnlinkButtonClicked);
  },
  _unsubscribeToSchemaMappingDialogEventsAndCloseDialog: function _unsubscribeToSchemaMappingDialogEventsAndCloseDialog() {
    this.schemaMappingDialog.close();
    this.schemaMappingModel.set('isVisible', false);
    this.stopListening(this.schemaMappingDialog);
    this.stopListening(this.domainValidationEventBus);
  }
});

module.exports = MapSchemasState;

});