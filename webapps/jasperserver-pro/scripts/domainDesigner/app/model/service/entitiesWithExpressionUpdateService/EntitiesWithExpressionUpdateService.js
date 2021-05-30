define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EntitiesWithExpressionUpdateService = function EntitiesWithExpressionUpdateService(options) {
  this.initialize(options);
};

_.extend(EntitiesWithExpressionUpdateService.prototype, {
  initialize: function initialize(options) {
    this.validationService = options.validationService;
    this.entitiesProviders = options.entitiesProviders;
    this.expressionWithContextProviders = options.expressionWithContextProviders;
    this.expressionUpdaters = options.expressionUpdaters;
  },
  update: function update(collections) {
    var entitiesAndExpressionsWithContext = this._getEntitiesAndExpressionsWithContext(collections);

    var self = this;
    var entitiesExpressionsWithContext = entitiesAndExpressionsWithContext.entitiesExpressionsWithContext;

    if (_.size(entitiesExpressionsWithContext) > 0) {
      return this.validationService.validateDOMElCollection(entitiesExpressionsWithContext).then(function (response) {
        var entitiesPerProvider = entitiesAndExpressionsWithContext.entitiesPerProvider;

        var splitExpressionContexts = self._splitExpressionsContextByEntitiesPerProvider({
          expressionContexts: response.expressionContexts,
          entitiesPerProvider: entitiesPerProvider
        });

        self._updateExpressions(splitExpressionContexts, entitiesPerProvider);

        return collections;
      });
    } else {
      return new $.Deferred().resolve(collections);
    }
  },
  _getEntitiesAndExpressionsWithContext: function _getEntitiesAndExpressionsWithContext(collections) {
    var self = this;
    return _.reduce(this.expressionWithContextProviders, function (memo, provider, index) {
      var entities = self.entitiesProviders[index].getEntities(collections),
          expressionsWithContext = provider.getExpressionsWithContext(entities, collections);
      memo.entitiesPerProvider.push(entities);
      memo.entitiesExpressionsWithContext = memo.entitiesExpressionsWithContext.concat(expressionsWithContext);
      return memo;
    }, {
      entitiesPerProvider: [],
      entitiesExpressionsWithContext: []
    });
  },
  _splitExpressionsContextByEntitiesPerProvider: function _splitExpressionsContextByEntitiesPerProvider(options) {
    var start = 0,
        expressionContexts = options.expressionContexts,
        entitiesPerProvider = options.entitiesPerProvider;
    return _.map(entitiesPerProvider, function (entities) {
      var end = start + entities.length,
          result = expressionContexts.slice(start, end);
      start = end;
      return result;
    });
  },
  _updateExpressions: function _updateExpressions(expressionContexts, entities) {
    _.each(this.expressionUpdaters, function (expressionUpdater, index) {
      expressionUpdater.update(expressionContexts[index], entities[index]);
    });
  }
});

module.exports = EntitiesWithExpressionUpdateService;

});