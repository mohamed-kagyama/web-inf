define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var encryptedProfileAttributeErrorEnum = require("../enum/encryptedProfileAttributeErrorEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(errors) {
    return _.some(errors, function (error) {
      return error.errorCode === encryptedProfileAttributeErrorEnum.ENCRYPTED_PROFILE_ATTRIBUTE_ERROR;
    });
  }
};

});