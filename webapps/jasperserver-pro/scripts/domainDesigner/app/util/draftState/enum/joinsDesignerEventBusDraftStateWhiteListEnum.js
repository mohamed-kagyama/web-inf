define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftStateTypesEnum = require("../../../model/enum/draftStateTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var allDraftStates = _.values(draftStateTypesEnum);

module.exports = {
  'generate:joins': allDraftStates,
  'rename:tableReference': allDraftStates
};

});