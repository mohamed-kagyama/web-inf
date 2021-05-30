define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var eventBusFactory = require("../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = createDomainValidation;

function createDomainValidation(context, options) {
  context.register('domainValidationEventBus', eventBusFactory.create());
  context.register('validationEventBus', eventBusFactory.create());
}

});