define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var selectedFieldsUtil = require("../util/selectedFieldsUtil");

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerQueryRunController = function DerivedTablesDesignerQueryRunController(options) {
  this.derivedTablesDesignerStore = options.derivedTablesDesignerStore;
  this.derivedTablesDesignerDerivedTableValidator = options.derivedTablesDesignerDerivedTableValidator;
  this.derivedTablesDesignerAvailableFieldsValidator = options.derivedTablesDesignerAvailableFieldsValidator;
  this.derivedTablesDesignerConnectionService = options.derivedTablesDesignerConnectionService;
  this.derivedTablesDesignerStoreQueryResultDataProvider = options.derivedTablesDesignerStoreQueryResultDataProvider;
};

_.extend(DerivedTablesDesignerQueryRunController.prototype, {
  runQuery: function runQuery() {
    var query = this.derivedTablesDesignerStore.get('query'),
        dataSourceId = this.derivedTablesDesignerStore.get('dataSourceId'),
        queryErrorMessage = this.derivedTablesDesignerDerivedTableValidator.validateQuery(query),
        self = this,
        promise;

    if (queryErrorMessage) {
      promise = $.Deferred().reject(queryErrorMessage).promise();
    } else {
      promise = this.derivedTablesDesignerConnectionService.executeQuery(dataSourceId, query).then(function (fields) {
        return self.derivedTablesDesignerAvailableFieldsValidator.validate(fields);
      }).then(function (fields) {
        self._updateStoreAfterQueryExecution({
          fields: fields || [],
          selectedFields: self._getSelectedFieldsAfterQueryExecution({
            fields: fields,
            query: query
          }),
          queryAfterPreviousExecution: query,
          queryErrorMessage: ''
        });
      });
    }

    return promise.fail(function (error) {
      self._onRunQueryRejected(error);
    });
  },
  _getSelectedFieldsAfterQueryExecution: function _getSelectedFieldsAfterQueryExecution(options) {
    var fields = options.fields,
        query = options.query,
        queryAfterPreviousExecution = this.derivedTablesDesignerStore.get('queryAfterPreviousExecution'),
        existingFields = this.derivedTablesDesignerStore.get('fields'),
        selection = this.derivedTablesDesignerStore.get('selection'),
        selectedFields = selectedFieldsUtil.getSelectedFieldsAsArray({
      fields: existingFields,
      selection: selection
    });
    var shouldTryToReuseExistingSelection = query === queryAfterPreviousExecution && !_.isEmpty(selectedFields);

    if (shouldTryToReuseExistingSelection) {
      var fieldsMap = fields.reduce(function (memo, field) {
        memo[field.name] = true;
        return memo;
      }, {});

      var newFieldsHaveAtLeastOneFieldFromExistingSelection = _.some(selectedFields, function (selectedField) {
        return fieldsMap[selectedField.name];
      });

      selectedFields = newFieldsHaveAtLeastOneFieldFromExistingSelection ? selectedFields : fields;
    } else {
      selectedFields = fields;
    }

    return selectedFields;
  },
  _onRunQueryRejected: function _onRunQueryRejected(error) {
    if (error === requestCanceledEnum.CANCELED) {
      return;
    }

    var message = error,
        responseJson = error.responseJSON;

    if (responseJson) {
      responseJson = _.isArray(responseJson) ? responseJson : [responseJson];
      message = responseJson[0] && responseJson[0].message;

      if (responseJson[0].details) {
        message = responseJson[0].details[0].message;
      }
    }

    this._updateStoreAfterQueryExecution({
      fields: [],
      selectedFields: [],
      queryErrorMessage: message
    });
  },
  _updateStoreAfterQueryExecution: function _updateStoreAfterQueryExecution(options) {
    var queryResultStoreData = this.derivedTablesDesignerStoreQueryResultDataProvider.getQueryResultStoreData(options);
    this.derivedTablesDesignerStore.set(_.extend({
      queryAfterPreviousExecution: options.queryAfterPreviousExecution || '',
      queryErrorMessage: options.queryErrorMessage || ''
    }, queryResultStoreData));
  }
});

module.exports = DerivedTablesDesignerQueryRunController;

});