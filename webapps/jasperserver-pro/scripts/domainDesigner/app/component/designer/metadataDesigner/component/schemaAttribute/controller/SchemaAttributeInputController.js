define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var requestCanceledEnum = require("../../../../../../rest/enum/requestCanceledEnum");

var profileAttributeUtil = require("../../../../../../../model/util/profileAttributeUtil");

var resourceNameSpecialCharactersUtil = require("../../../../../../model/util/resourceNameSpecialCharactersUtil");

var dataSourceTypeEnum = require("../../../../../../model/enum/dataSourceTypeEnum");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SchemaAttributeInputController = function SchemaAttributeInputController(options) {
  this.initialize(options);
};

_.extend(SchemaAttributeInputController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    _.bindAll(this, '_handleValidationFailure');

    this.schemaAttributeInputStore = options.metadataDesignerVueStore.get('schemaAttributeInput');
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.metadataDesignerEventBus = options.metadataDesignerEventBus;
    this.schemaAttributeInputValidator = options.schemaAttributeInputValidator;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.schemasNameGenerator = options.schemasNameGenerator;
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._renderFromState);
    this.listenTo(this.metadataDesignerEventBus, 'input:attribute', this._onInputAttribute);
    this.listenTo(this.metadataDesignerEventBus, 'add:attribute', this._onAddAttribute);
    this.listenTo(this.metadataDesignerEventBus, 'update:attribute', this._onUpdateAttribute);
    this.listenTo(this.metadataDesignerEventBus, 'cancel:attribute', this._onCancelUpdateAttribute);
  },
  _onInputAttribute: function _onInputAttribute(value) {
    this.schemaAttributeInputStore.attribute = value.trim();
    this.schemaAttributeInputStore.error = "";
  },
  _onAddAttribute: function _onAddAttribute() {
    var self = this,
        schemaAttributeInputStore = _.clone(this.schemaAttributeInputStore);

    this.schemaAttributeInputValidator.validate(schemaAttributeInputStore).then(function () {
      self._addSchemaAttribute();
    }, this._handleValidationFailure);
  },
  _onUpdateAttribute: function _onUpdateAttribute() {
    var self = this,
        schemaAttributeInputStore = _.clone(this.schemaAttributeInputStore);

    this.schemaAttributeInputValidator.validate(schemaAttributeInputStore).then(function () {
      self._updateSchemaAttribute();
    }, this._handleValidationFailure);
  },
  _handleValidationFailure: function _handleValidationFailure(error) {
    if (error !== requestCanceledEnum.CANCELED) {
      this.schemaAttributeInputStore.error = error;
    }
  },
  _onCancelUpdateAttribute: function _onCancelUpdateAttribute() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.METADATA_DESIGNER_CANCEL_SCHEMA_ATTRIBUTE);
  },
  _addSchemaAttribute: function _addSchemaAttribute() {
    var attribute = this.schemaAttributeInputStore.attribute,
        parentId = this.schemaAttributeInputStore.parentId,
        resourceDTO = this._createDataSourceGroupDTO(attribute);

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.METADATA_DESIGNER_ADD_SCHEMA_ATTRIBUTE, {
      dataSourceGroup: resourceDTO,
      parentId: parentId
    });
  },
  _updateSchemaAttribute: function _updateSchemaAttribute() {
    var attribute = this.schemaAttributeInputStore.attribute,
        resourceDTO = _.extend(this._createDataSourceGroupDTO(attribute), {
      id: this.schemaAttributeInputStore.dataSourceGroupId
    });

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.METADATA_DESIGNER_UPDATE_SCHEMA_ATTRIBUTE, resourceDTO);
  },
  _createDataSourceGroupDTO: function _createDataSourceGroupDTO(name) {
    this.schemasNameGenerator.reset();
    var self = this,
        schemaName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(name);
    schemaName = this.schemasNameGenerator.generate(schemaName, function (name) {
      return self.clientDomainSchemaService.getDataSourceGroupByName(name);
    });
    return {
      name: schemaName,
      sourceName: name
    };
  },
  _getCurrentResourceId: function _getCurrentResourceId() {
    var currentResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource();
    return currentResource && currentResource.resourceId;
  },
  _renderFromState: function _renderFromState() {
    this._resetSchemaAttributeModel();

    this.schemaAttributeInputStore.isVisible = this._isSchemaAttributeInputVisible();
    this.schemaAttributeInputStore.parentId = this._getCurrentResourceId();

    if (this.schemaAttributeInputStore.isVisible) {
      var selection = this.metadataDesignerViewStateModelService.getResultTreeSelection(),
          name,
          dataSourceGroup,
          isProfileAttributeSelected;

      if (selection.length === 1) {
        name = selection[0];
        dataSourceGroup = this.clientDomainSchemaService.getDataSourceGroupByName(name);
        isProfileAttributeSelected = dataSourceGroup.sourceName && profileAttributeUtil.containsProfileAttribute(dataSourceGroup.sourceName);
      }

      if (isProfileAttributeSelected) {
        this.schemaAttributeInputStore.dataSourceGroupId = dataSourceGroup && dataSourceGroup.id;
        this.schemaAttributeInputStore.attribute = dataSourceGroup.sourceName;
        this.schemaAttributeInputStore.error = '';
      }
    }
  },
  _isSchemaAttributeInputVisible: function _isSchemaAttributeInputVisible() {
    var currentResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource(),
        currentResourceType = currentResource && currentResource.type,
        dataSource,
        currentDataSource,
        currentDataSourceType;
    var isDataSourceSelected = entityUtil.isDataSource(currentResourceType),
        isDataSourceWithSchemas;

    if (isDataSourceSelected) {
      dataSource = this.clientDomainSchemaService.getDataSourceById(currentResource.resourceId);
      currentDataSource = this.metadataDesignerViewStateModelService.getDataSourceByName(dataSource.name);
      currentDataSourceType = currentDataSource && currentDataSource.type;
      isDataSourceWithSchemas = currentDataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS;
    }

    return isDataSourceSelected && isDataSourceWithSchemas;
  },
  _resetSchemaAttributeModel: function _resetSchemaAttributeModel() {
    this.schemaAttributeInputStore.attribute = '';
    this.schemaAttributeInputStore.dataSourceGroupId = '';
    this.schemaAttributeInputStore.error = '';
    this.schemaAttributeInputStore.parentId = '';
  }
});

module.exports = SchemaAttributeInputController;

});