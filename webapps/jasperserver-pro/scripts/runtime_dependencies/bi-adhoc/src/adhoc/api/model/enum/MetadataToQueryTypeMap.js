define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var queryVariableTypes = require('./QueryVariableTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var kindMap = {};
kindMap[queryVariableTypes.BYTE] = 'number';
kindMap[queryVariableTypes.SHORT] = 'number';
kindMap[queryVariableTypes.INTEGER] = 'number';
kindMap[queryVariableTypes.BIG_INTEGER] = 'number';
kindMap[queryVariableTypes.LONG] = 'number';
kindMap[queryVariableTypes.DOUBLE] = 'number';
kindMap[queryVariableTypes.DECIMAL] = 'number';
kindMap[queryVariableTypes.FLOAT] = 'number';
kindMap[queryVariableTypes.BIG_DECIMAL] = 'number';
kindMap[queryVariableTypes.DATE] = queryVariableTypes.DATE;
kindMap[queryVariableTypes.TIME] = queryVariableTypes.TIME;
kindMap[queryVariableTypes.TIMESTAMP] = queryVariableTypes.TIMESTAMP;
kindMap[queryVariableTypes.STRING] = queryVariableTypes.STRING;
kindMap[queryVariableTypes.BOOLEAN] = queryVariableTypes.BOOLEAN;
module.exports = kindMap;

});