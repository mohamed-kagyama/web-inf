define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InitializeDomainDesignerState = function InitializeDomainDesignerState(options) {
  this.initialize(options);
};

_.extend(InitializeDomainDesignerState.prototype, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    if (context.domainUri) {
      stateFactory.enter(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_BY_DOMAIN_URI_STATE, context);
    } else if (context.dataSourceUri) {
      stateFactory.enter(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_BY_DATA_SOURCE_URI_STATE, context);
    } else {
      stateFactory.enter(validationStateNameEnum.SELECT_DATA_SOURCE_STATE, context);
    }
  }
});

module.exports = InitializeDomainDesignerState;

});