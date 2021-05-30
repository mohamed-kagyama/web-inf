define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var validationStateContextUtil = require("./util/validationStateContextUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InitializeDomainDesignerByDataSourceUriState = function InitializeDomainDesignerByDataSourceUriState(options) {
  this.initialize(options);
};

_.extend(InitializeDomainDesignerByDataSourceUriState.prototype, {
  initialize: function initialize(options) {
    this.clientDomainInitialDesignerStateService = options.clientDomainInitialDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var domainResource = this.clientDomainInitialDesignerStateService.createInitialDomainResource(context.dataSourceUri);
    validationStateContextUtil.setDomainResource(context, domainResource);
    this.clientDomainInitialDesignerStateService.getInitialDesignerStateByDataSourceUri(context.dataSourceUri).done(function (state) {
      context.domainDesignerState = state;
      stateFactory.enter(validationStateNameEnum.SET_DOMAIN_DESIGNER_STATE_STATE, context);
    }).fail(function (xhr) {
      context.xhr = xhr;
      stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE, context);
    });
  }
});

module.exports = InitializeDomainDesignerByDataSourceUriState;

});