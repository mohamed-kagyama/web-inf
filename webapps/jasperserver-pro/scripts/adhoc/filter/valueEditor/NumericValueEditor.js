define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var numericTrait = require('./numericTrait');

var InputValueEditor = require('./InputValueEditor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = InputValueEditor.extend(numericTrait);

});