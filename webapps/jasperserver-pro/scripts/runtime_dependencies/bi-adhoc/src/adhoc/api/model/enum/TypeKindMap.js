define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var queryVariableTypes = require('./QueryVariableTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var kindMap = {};
kindMap[queryVariableTypes.BYTE] = 'integer';
kindMap[queryVariableTypes.SHORT] = 'integer';
kindMap[queryVariableTypes.INTEGER] = 'integer';
kindMap[queryVariableTypes.BIG_INTEGER] = 'integer';
kindMap[queryVariableTypes.LONG] = 'integer';
kindMap[queryVariableTypes.DOUBLE] = 'float';
kindMap[queryVariableTypes.DECIMAL] = 'float';
kindMap[queryVariableTypes.FLOAT] = 'float';
kindMap[queryVariableTypes.BIG_DECIMAL] = 'float';
kindMap[queryVariableTypes.DATE] = 'date';
kindMap[queryVariableTypes.TIME] = 'time';
kindMap[queryVariableTypes.TIMESTAMP] = 'timestamp';
kindMap[queryVariableTypes.STRING] = 'string';
kindMap[queryVariableTypes.BOOLEAN] = 'boolean';
module.exports = kindMap;

});