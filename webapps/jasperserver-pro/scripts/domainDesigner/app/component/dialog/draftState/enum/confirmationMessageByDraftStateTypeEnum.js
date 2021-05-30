define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var draftStateTypesEnum = require("../../../../model/enum/draftStateTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var message = {};
message[draftStateTypesEnum.DRAFT_FILTER] = 'domain.designer.draftState.confirmation';
message[draftStateTypesEnum.JOIN_CONSTRUCTOR] = 'domain.designer.draftState.confirmation';
message[draftStateTypesEnum.DRAFT_JOIN_TREE] = 'domain.designer.draftState.confirmation';
module.exports = message;

});