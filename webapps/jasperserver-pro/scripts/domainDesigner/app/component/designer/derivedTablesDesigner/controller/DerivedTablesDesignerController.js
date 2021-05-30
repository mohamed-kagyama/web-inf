define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Backbone = require('backbone');

var selectedFieldsUtil = require("../util/selectedFieldsUtil");

var resourceNameSpecialCharactersUtil = require("../../../../model/util/resourceNameSpecialCharactersUtil");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

var queryRunningSourceEnum = require("../enum/queryRunningSourceEnum");

var newDerivedTableNameEnum = require("../enum/newDerivedTableNameEnum");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MAIN_ACTION_EVENTS = {
  'CREATE': applicationStateEventsEnum.DERIVED_TABLES_DESIGNER_CREATE_DERIVED_TABLE,
  'UPDATE': applicationStateEventsEnum.DERIVED_TABLES_DESIGNER_UPDATE_DERIVED_TABLE
};

var DerivedTablesDesignerController = function DerivedTablesDesignerController(options) {
  this.dialog = options.dialog;
  this.derivedTablesDesignerStore = options.derivedTablesDesignerStore;
  this.derivedTableLoaderDialogEventBus = options.derivedTableLoaderDialogEventBus;
  this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
  this.derivedTablesDesignerEventBus = options.derivedTablesDesignerEventBus;
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.derivedTablesDesignerDerivedTableValidator = options.derivedTablesDesignerDerivedTableValidator;
  this.expressionBulkUpdateService = options.expressionBulkUpdateService;
  this.initialQueryResultSetHeight = options.initialQueryResultSetHeight;
  this.fieldNameGenerator = options.fieldNameGenerator;
  this.derivedTablesDesignerStoreQueryResultDataProvider = options.derivedTablesDesignerStoreQueryResultDataProvider;
  this.derivedTablesDesignerQueryRunController = options.derivedTablesDesignerQueryRunController;

  this._initEvents();
};

_.extend(DerivedTablesDesignerController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.applicationCrossComponentEventBus, 'sidebar:createDerivedTable', this._onStartDerivedTableCreation);
    this.listenTo(this.applicationCrossComponentEventBus, 'sidebarTreeMenu:editDerivedTable', this._onStartDerivedTableEditing);
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:runQuery', _.bind(this._onRunQuery, this, queryRunningSourceEnum.RUN_QUERY));
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:cancelQuery', this._onCancelQuery);
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:createDerivedTable', this._onCreateDerivedTable);
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:updateDerivedTable', this._onUpdateDerivedTable);
    this.listenTo(this.derivedTableLoaderDialogEventBus, 'show', this._showLoader);
    this.listenTo(this.derivedTableLoaderDialogEventBus, 'hide', this._hideLoader);
    this.listenTo(this.dialog, 'dialog:close', this._onDialogClose);
  },
  _onStartDerivedTableCreation: function _onStartDerivedTableCreation(dataSourceId) {
    var queryResultStoreData = this.derivedTablesDesignerStoreQueryResultDataProvider.getQueryResultStoreData({
      fields: [],
      selectedFields: [],
      queryResultSetHeight: this.initialQueryResultSetHeight
    });

    var storeData = _.extend(queryResultStoreData, {
      dataSourceId: dataSourceId,
      queryResultSetHeight: this.initialQueryResultSetHeight,
      name: this.clientDomainSchemaService.getNameForTableReferenceCopy(newDerivedTableNameEnum.NAME)
    });

    this.derivedTablesDesignerStore.reset(storeData);
    this.dialog.open();
  },
  _onStartDerivedTableEditing: function _onStartDerivedTableEditing(derivedTableId) {
    var tableJson = this.clientDomainSchemaService.getDerivedTableJsonByIdWithFields(derivedTableId);

    var children = _.map(tableJson.children, function (child) {
      child = _.extend({}, child, {
        name: child.sourceName || child.name,
        originalName: child.name
      });
      return child;
    });

    var queryResultStoreData = this.derivedTablesDesignerStoreQueryResultDataProvider.getQueryResultStoreData({
      fields: children,
      selectedFields: children,
      queryResultSetHeight: this.initialQueryResultSetHeight
    });

    var storeData = _.extend(queryResultStoreData, {
      id: tableJson.id,
      name: tableJson.name,
      originalName: tableJson.name,
      query: tableJson.query,
      queryAfterPreviousExecution: tableJson.query,
      dataSourceId: tableJson.dataSourceId,
      parentId: tableJson.parentId,
      queryResultSetHeight: this.initialQueryResultSetHeight
    });

    this.derivedTablesDesignerStore.reset(storeData);
    this.dialog.open();
  },
  _onRunQuery: function _onRunQuery(queryRunningSource) {
    this.derivedTablesDesignerStore.set('queryRunningSource', queryRunningSource);
    return this.derivedTablesDesignerQueryRunController.runQuery();
  },
  _onCancelQuery: function _onCancelQuery() {
    this.derivedTableLoaderDialogEventBus.trigger('cancel');
  },
  _showLoader: function _showLoader() {
    this.derivedTablesDesignerStore.set('isQueryRunning', true);
  },
  _hideLoader: function _hideLoader() {
    this.derivedTablesDesignerStore.set({
      isQueryRunning: false,
      queryRunningSource: ''
    });
  },
  _onCreateDerivedTable: function _onCreateDerivedTable() {
    var self = this;

    this._updateFieldsIfQueryWasChanged().done(function () {
      var isDerivedTableValid = self._validateDerivedTable();

      if (isDerivedTableValid) {
        self.applicationDispatcherEventBus.trigger(MAIN_ACTION_EVENTS.CREATE, self._getDerivedTableDTO());
        self.dialog.close();
      }
    });
  },
  _onUpdateDerivedTable: function _onUpdateDerivedTable() {
    var self = this,
        updatedDerivedTableName = this.derivedTablesDesignerStore.get('name'),
        originalDerivedTableName = this.derivedTablesDesignerStore.get('originalName');
    var tableReference = this.clientDomainSchemaService.getTableReferenceByName(originalDerivedTableName),
        isDerivedTableNameChanged = updatedDerivedTableName !== originalDerivedTableName;

    this._updateFieldsIfQueryWasChanged().done(function () {
      var isDerivedTableValid = self._validateDerivedTable();

      if (isDerivedTableValid) {
        if (isDerivedTableNameChanged) {
          self.expressionBulkUpdateService.getUpdatedExpressions({
            resourceId: tableReference.id,
            resourceType: schemaEntitiesEnum.TABLE_REFERENCE,
            originalName: originalDerivedTableName,
            newName: updatedDerivedTableName
          }).then(function (resourcesToUpdate) {
            self._updateDerivedTable(resourcesToUpdate);
          });
        } else {
          self._updateDerivedTable([]);
        }
      }
    });
  },
  _updateDerivedTable: function _updateDerivedTable(resources) {
    this.applicationDispatcherEventBus.trigger(MAIN_ACTION_EVENTS.UPDATE, {
      derivedTable: this._getDerivedTableDTO(),
      resources: resources
    });
    this.dialog.close();
  },
  _updateFieldsIfQueryWasChanged: function _updateFieldsIfQueryWasChanged() {
    var promise;
    var query = this.derivedTablesDesignerStore.get('query');
    var queryAfterPreviousExecution = this.derivedTablesDesignerStore.get('queryAfterPreviousExecution');

    if (query !== queryAfterPreviousExecution) {
      promise = this._onRunQuery(queryRunningSourceEnum.CREATE_OR_UPDATE_DERIVED_TABLE);
    } else {
      promise = $.Deferred().resolve().promise();
    }

    return promise;
  },
  _onDialogClose: function _onDialogClose() {
    this.derivedTableLoaderDialogEventBus.trigger('cancel');
  },
  _validateDerivedTable: function _validateDerivedTable() {
    var validator = this.derivedTablesDesignerDerivedTableValidator;
    var store = this.derivedTablesDesignerStore;
    var validationError = {
      selection: validator.validateSelectedFields(store.get('selection').fields),
      name: validator.validateName(store.get('name'), store.get('id'), store.get('dataSourceId')),
      query: validator.validateFieldTypes(store.get('id'), store.get('fields')) || validator.validateQuery(store.get('query'))
    };
    store.set({
      selectedFieldsErrorMessage: validationError.selection,
      tableNameErrorMessage: validationError.name,
      queryErrorMessage: validationError.query || store.get('queryErrorMessage')
    });

    var isInvalid = _.some(validationError, function (specificError) {
      return Boolean(specificError);
    });

    return !isInvalid;
  },
  _getDerivedTableDTO: function _getDerivedTableDTO() {
    return {
      id: this.derivedTablesDesignerStore.get('id'),
      type: this.derivedTablesDesignerStore.get('type'),
      name: this.derivedTablesDesignerStore.get('name'),
      query: this.derivedTablesDesignerStore.get('query'),
      dataSourceId: this.derivedTablesDesignerStore.get('dataSourceId'),
      parentId: this.derivedTablesDesignerStore.get('parentId'),
      children: this._getDerivedTableChildren()
    };
  },
  _getDerivedTableChildren: function _getDerivedTableChildren() {
    this.fieldNameGenerator.reset();
    var fields = this.derivedTablesDesignerStore.get('fields'),
        selection = this.derivedTablesDesignerStore.get('selection');
    var children = selectedFieldsUtil.getSelectedFieldsAsArray({
      fields: fields,
      selection: selection
    });
    return _.map(children, function (child) {
      child = _.clone(child);

      if (child.originalName) {
        child.name = child.originalName;
        delete child.originalName;
      } else if (resourceNameSpecialCharactersUtil.isResourceNameContainsSpecialCharacters(child.name)) {
        child.sourceName = child.name;
        child.name = this._generateFieldName(child.sourceName);
      }

      return child;
    }, this);
  },
  _generateFieldName: function _generateFieldName(originalFieldName) {
    var self = this,
        fieldName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(originalFieldName);
    return this.fieldNameGenerator.generate(fieldName, function (name) {
      return self.clientDomainSchemaService.getFieldByName(name);
    });
  }
});

module.exports = DerivedTablesDesignerController;

});