define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var restErrorCodesEnum = require("../../../../../rest/enum/restErrorCodesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var invalidSecurityFileErrorsEnum = {};
invalidSecurityFileErrorsEnum[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_INVALID] = true;
invalidSecurityFileErrorsEnum[restErrorCodesEnum.DOMAIN_SECURITY_MISSING_ELEMENT] = true;
invalidSecurityFileErrorsEnum[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_RESOURCE_ACCESS_GRANT_EXPRESSION_INVALID_FIELDS] = true;
invalidSecurityFileErrorsEnum[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_RESOURCE_ACCESS_GRANT_EXPRESSION_PARSE_ERROR] = true;
module.exports = invalidSecurityFileErrorsEnum;

});