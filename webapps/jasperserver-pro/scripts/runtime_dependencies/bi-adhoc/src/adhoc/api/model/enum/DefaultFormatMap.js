define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var queryVariableTypes = require('./QueryVariableTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var defaultFormatMap = {};
defaultFormatMap[queryVariableTypes.BYTE] = 'ADH_100_MASK_int_0';
defaultFormatMap[queryVariableTypes.SHORT] = 'ADH_100_MASK_int_0';
defaultFormatMap[queryVariableTypes.INTEGER] = 'ADH_100_MASK_int_0';
defaultFormatMap[queryVariableTypes.BIG_INTEGER] = 'ADH_100_MASK_int_0';
defaultFormatMap[queryVariableTypes.LONG] = 'ADH_100_MASK_int_0';
defaultFormatMap[queryVariableTypes.FLOAT] = 'ADH_100_MASK_dec_0';
defaultFormatMap[queryVariableTypes.DOUBLE] = 'ADH_100_MASK_dec_0';
defaultFormatMap[queryVariableTypes.DECIMAL] = 'ADH_100_MASK_dec_0';
defaultFormatMap[queryVariableTypes.BIG_DECIMAL] = 'ADH_100_MASK_dec_0';
defaultFormatMap[queryVariableTypes.DATE] = 'ADH_100_MASK_date_0';
defaultFormatMap[queryVariableTypes.TIME] = 'ADH_100_MASK_time_0';
defaultFormatMap[queryVariableTypes.TIMESTAMP] = 'ADH_100_MASK_timestamp_0';
defaultFormatMap[queryVariableTypes.STRING] = '';
defaultFormatMap[queryVariableTypes.BOOLEAN] = '';
module.exports = defaultFormatMap;

});