define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var validationStateContextUtil = require("./util/validationStateContextUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainDesignerInitialStateDataSourceUriSelectedState = function DomainDesignerInitialStateDataSourceUriSelectedState(options) {
  this.initialize(options);
};

_.extend(DomainDesignerInitialStateDataSourceUriSelectedState.prototype, {
  initialize: function initialize(options) {
    this.domainValidationMutations = options.domainValidationMutations;
    this.clientDomainInitialDesignerStateService = options.clientDomainInitialDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var self = this;
    validationStateContextUtil.setDataSource(context, context.dataSourceUri);

    if (validationStateContextUtil.shouldInitializeNewDomainByDataSourceUri(context)) {
      stateFactory.enter(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_BY_DATA_SOURCE_URI_STATE, context);
    } else {
      this.clientDomainInitialDesignerStateService.getInitialDesignerStateByDomainResource(context.domainResource).then(function (domainInitialState) {
        self.domainValidationMutations.setDesignerState(domainInitialState);
        stateFactory.enter(validationStateNameEnum.REPLACE_DATA_SOURCE_STATE, context);
      }, function (xhr) {
        context.xhr = xhr;
        stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE, context);
      });
    }
  }
});

module.exports = DomainDesignerInitialStateDataSourceUriSelectedState;

});