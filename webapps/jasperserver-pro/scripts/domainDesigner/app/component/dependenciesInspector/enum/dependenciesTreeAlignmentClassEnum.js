define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dependenciesTreeAlignmentEnum = require('./dependenciesTreeAlignmentEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var alignmentClass = {};
alignmentClass[dependenciesTreeAlignmentEnum.LEFT_ALIGNMENT] = 'jr-uLeft';
alignmentClass[dependenciesTreeAlignmentEnum.RIGHT_ALIGNMENT] = 'jr-uRight';
module.exports = alignmentClass;

});