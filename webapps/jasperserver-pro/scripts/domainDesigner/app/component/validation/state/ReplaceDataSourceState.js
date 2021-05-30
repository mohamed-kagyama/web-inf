define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var profileAttributeUtil = require("../../../../model/util/profileAttributeUtil");

var resourceNameSpecialCharactersUtil = require("../../../model/util/resourceNameSpecialCharactersUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReplaceDataSourceState = function ReplaceDataSourceState(options) {
  this.initialize(options);
};

_.extend(ReplaceDataSourceState.prototype, {
  initialize: function initialize(options) {
    this.clientDomainValidationService = options.clientDomainValidationService;
    this.domainValidationMutations = options.domainValidationMutations;
    this.dataSourceFreshInfoService = options.dataSourceFreshInfoService;
  },
  enter: function enter(context, stateFactory) {
    var self = this;
    this.dataSourceFreshInfoService.fetchFreshDataSourceInfoWithAvailableSchemas(context.dataSourceUri).then(function (dataSourceInfoWithAvailableSchemas) {
      var state;
      dataSourceInfoWithAvailableSchemas = self._replaceSpecialCharactersInDataSourceName(dataSourceInfoWithAvailableSchemas);
      self.domainValidationMutations.replaceDataSourceMetadata(dataSourceInfoWithAvailableSchemas);
      context.availableSchemasToMap = dataSourceInfoWithAvailableSchemas.availableSchemas;
      var existingSchemas = self.clientDomainValidationService.getAllSchemasSourceNamesOrNames();

      var schemasContainProfileAttributeBasedSchemas = _.some(existingSchemas, function (name) {
        return profileAttributeUtil.containsProfileAttributeWithPlaceholders(name);
      });

      if (schemasContainProfileAttributeBasedSchemas) {
        state = validationStateNameEnum.DOMAIN_VALIDATION_STATE;
      } else {
        state = validationStateNameEnum.MAP_SCHEMAS_STATE;
      }

      stateFactory.enter(state, context);
    }, function (xhr) {
      context.xhr = xhr;
      stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_STATE, context);
    });
  },
  _replaceSpecialCharactersInDataSourceName: function _replaceSpecialCharactersInDataSourceName(dataSourceInfo) {
    var dataSourceName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(dataSourceInfo.name);
    return _.extend({}, dataSourceInfo, {
      name: dataSourceName
    });
  }
});

module.exports = ReplaceDataSourceState;

});