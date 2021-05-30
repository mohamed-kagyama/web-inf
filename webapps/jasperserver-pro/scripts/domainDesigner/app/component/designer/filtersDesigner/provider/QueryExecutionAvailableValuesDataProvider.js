define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IN_MEMORY_DOMAIN_CACHE_KEY = 'domain';

var QueryExecutionAvailableValuesDataProvider = function QueryExecutionAvailableValuesDataProvider(options) {
  this.initialize(options);
};

_.extend(QueryExecutionAvailableValuesDataProvider.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'getData');

    this.domainToInMemoryDomainForAvailableValuesConverter = options.domainToInMemoryDomainForAvailableValuesConverter;
    this.queryExecutionService = options.queryExecutionService;
    this.adhocQueryByFieldNameFactory = options.adhocQueryByFieldNameFactory;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.multilevelAdhocQueryToAvailableValuesConverter = options.multilevelAdhocQueryToAvailableValuesConverter;
    this.cache = options.cache;
    this.errorsCache = options.errorsCache;
    this.availableValuesFirstRequestSuccessCache = options.availableValuesFirstRequestSuccessCache;
  },
  getData: function getData(options) {
    options = options || {};

    var self = this,
        draftFilter = options.draftFilter,
        leftOperand = draftFilter.expression.left,
        adhocQuery = this._getAdhocQuery(leftOperand, options.criteria),
        domain = this._getInMemoryDomain(leftOperand),
        errorsCacheKey = this._getErrorsCacheKey(domain),
        error = this.errorsCache.get(errorsCacheKey);

    var isCancelError = error === requestCanceledEnum.CANCELED;
    var initialRequestHasBeenCanceled = isCancelError && !this.availableValuesFirstRequestSuccessCache.get('atLeastOneRequestSuccessful');

    if (initialRequestHasBeenCanceled) {
      // no values were cached, resolve data with empty values
      return new $.Deferred().resolve({
        data: [],
        total: 0
      }).promise();
    } else if (error && !isCancelError) {
      return new $.Deferred().reject(error).promise();
    } else {
      var adhocQueryExecutionOptions = {
        adhocQuery: adhocQuery,
        domain: domain,
        queryParams: _.pick(options, ['offset', 'limit'])
      };
      return this.queryExecutionService.executeAdhocQuery(adhocQueryExecutionOptions).then(function (result) {
        // if at least one request was successful we can use values from cache.
        self.availableValuesFirstRequestSuccessCache.add('atLeastOneRequestSuccessful', true);
        var convertedResult = self.multilevelAdhocQueryToAvailableValuesConverter.convert(result, draftFilter.dataType);
        return new $.Deferred().resolve(convertedResult);
      }).fail(function (xhr) {
        self.errorsCache.add(errorsCacheKey, xhr);
      });
    }
  },
  _getErrorsCacheKey: function _getErrorsCacheKey(domain) {
    return JSON.stringify(domain);
  },
  _getAdhocQuery: function _getAdhocQuery(leftOperand, searchKeyword) {
    var field = this.clientDomainSchemaService.getEntityByIdAndType(leftOperand.fieldId, leftOperand.fieldType);
    return this.adhocQueryByFieldNameFactory.create({
      fieldName: field.name,
      fieldType: field.type,
      searchKeyword: searchKeyword
    });
  },
  _getInMemoryDomain: function _getInMemoryDomain(leftOperand) {
    if (!this.cache.get(IN_MEMORY_DOMAIN_CACHE_KEY)) {
      var fieldReference = {
        sourceId: leftOperand.sourceId,
        sourceType: leftOperand.sourceType,
        fieldId: leftOperand.fieldId,
        fieldType: leftOperand.fieldType
      };
      var domain = this.domainToInMemoryDomainForAvailableValuesConverter.convert(fieldReference);
      this.cache.add(IN_MEMORY_DOMAIN_CACHE_KEY, domain);
    }

    return this.cache.get(IN_MEMORY_DOMAIN_CACHE_KEY);
  }
});

module.exports = QueryExecutionAvailableValuesDataProvider;

});