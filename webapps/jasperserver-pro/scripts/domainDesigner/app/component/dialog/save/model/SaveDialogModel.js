define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  constructor: function constructor(options, constructorOptions) {
    this.clientDomainValidationService = constructorOptions.clientDomainValidationService;
    SimpleModel.prototype.constructor.call(this, options);
  },
  toJSON: function toJSON(useContentInsteadOfResourceReferenceForSubResources) {
    var saveDialogProperties = this.get('saveDialogProperties');
    return _.extend({}, this.clientDomainValidationService.serializeToSaveSchema(useContentInsteadOfResourceReferenceForSubResources), saveDialogProperties);
  }
});

});