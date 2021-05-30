define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var mimeTypesEnum = require("../enum/mimeTypesEnum");

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ContextExecutor = function ContextExecutor(options) {
  this.initialize(options);
};

_.extend(ContextExecutor.prototype, {
  initialize: function initialize(options) {
    this.request = options.request;
    this.retryConnectionAttempts = options.retryConnectionAttempts || 1;
    this.contextFactory = options.contextFactory;
    this.contextUUIDUrlProvider = options.contextUUIDUrlProvider;
    this.cache = options.cache;
  },
  execute: function execute(context, contextOptions, options) {
    options = options || {};

    var contextUUIDUrl = this._getContextUUIDUrl(context);

    if (contextUUIDUrl && !options.refresh) {
      return this._execute({
        contextUUIDUrl: contextUUIDUrl,
        context: context,
        contextOptions: contextOptions
      });
    }

    return this._createAndExecuteNewContext({
      context: context,
      contextOptions: contextOptions
    });
  },
  _getCacheKey: function _getCacheKey(context) {
    return JSON.stringify(context);
  },
  _getContextUUIDUrl: function _getContextUUIDUrl(context) {
    var cacheKey = this._getCacheKey(context);

    return this.cache.get(cacheKey);
  },
  _setContextUUIDUrl: function _setContextUUIDUrl(context, contextUUIDUrl) {
    var cacheKey = this._getCacheKey(context);

    this.cache.add(cacheKey, contextUUIDUrl);
  },
  _removeContextUUIDUrl: function _removeContextUUIDUrl(context) {
    var cacheKey = this._getCacheKey(context);

    this.cache.reset(cacheKey);
  },
  _execute: function _execute(options, connectionAttempt) {
    connectionAttempt = _.isUndefined(connectionAttempt) ? 1 : connectionAttempt;
    var self = this,
        context = options.context,
        contextUUIDUrl = options.contextUUIDUrl,
        contextOptions = options.contextOptions;
    var accept = contextOptions.accept || mimeTypesEnum.GENERIC_JSON,
        url = contextOptions.url || '',
        type = contextOptions.type || 'POST';

    var requestOptions = _.defaults({
      type: type,
      headers: {
        'Accept': accept
      },
      processData: false,
      dataType: 'json',
      contextUUIDUrl: contextUUIDUrl,
      url: contextUUIDUrl + url
    }, _.omit(contextOptions, ['accept']));

    return this.request(requestOptions).then(function (response) {
      return response;
    }, function (xhr) {
      if (self._isConnectionDead(xhr) && self._shouldRetryConnection(connectionAttempt)) {
        return self._createAndExecuteNewContext({
          context: context,
          contextOptions: contextOptions
        }, connectionAttempt + 1);
      } else {
        self._removeContextUUIDUrl(context);

        return new $.Deferred().reject(xhr);
      }
    });
  },
  _createAndExecuteNewContext: function _createAndExecuteNewContext(options, connectionAttempt) {
    connectionAttempt = _.isUndefined(connectionAttempt) ? 1 : connectionAttempt;
    var self = this,
        context = options.context,
        contextOptions = options.contextOptions;

    this._removeContextUUIDUrl(context);

    var newContext = this.contextFactory.create(context);
    return newContext.then(function (response, status, xhr) {
      var contextUUIDUrl = self.contextUUIDUrlProvider.get(xhr);

      self._setContextUUIDUrl(context, contextUUIDUrl);

      return self._execute({
        context: context,
        contextOptions: contextOptions,
        contextUUIDUrl: contextUUIDUrl
      }, connectionAttempt);
    });
  },
  _isConnectionDead: function _isConnectionDead(xhr) {
    return xhr.status === 404;
  },
  _shouldRetryConnection: function _shouldRetryConnection(currentAttempt) {
    return this.retryConnectionAttempts >= currentAttempt;
  }
});

module.exports = ContextExecutor;

});