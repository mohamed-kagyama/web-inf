define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var reportDashletViewTrait = require('../../base/componentViewTrait/adhocTrait');

var ReportsParametersCollection = require('../../../collection/ReportsParametersCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ParametersCache = ReportsParametersCollection.instance;
var _initComponent2 = reportDashletViewTrait._initComponent;

function paramsChanged(existing, loaded) {
  var serverParams = _.filter(existing, function (param) {
    return !param.parametrizeProperty;
  }),
      existingIds = _.pluck(serverParams, 'id'),
      loadedIds = _.pluck(loaded, 'id'),
      removed = _.difference(existingIds, loadedIds),
      added = _.difference(loadedIds, existingIds);

  return removed.length || added.length;
}

module.exports = _.extend({}, reportDashletViewTrait, {
  _initComponent: function _initComponent() {
    var self = this;
    ParametersCache.getReportParameters(this.model.resource.resource.get('uri')).done(function (parameters, outputParameters) {
      if (paramsChanged(self.model.get('parameters'), parameters) || paramsChanged(self.model.get('outputParameters'), outputParameters)) {
        self.model.set({
          parameters: parameters,
          outputParameters: outputParameters
        });
      } else {
        var params = self.model.get('outputParameters'),
            i;

        if (params) {
          for (i = 0; i < outputParameters.length; i++) {
            _.findWhere(params, {
              id: outputParameters[i].id
            }).label = outputParameters[i].label;
          }
        }

        params = self.model.get('parameters');

        if (params) {
          for (i = 0; i < parameters.length; i++) {
            _.findWhere(params, {
              id: parameters[i].id
            }).label = parameters[i].label;
          }
        }
      }
    });
    return _initComponent2.apply(this, arguments);
  }
});

});