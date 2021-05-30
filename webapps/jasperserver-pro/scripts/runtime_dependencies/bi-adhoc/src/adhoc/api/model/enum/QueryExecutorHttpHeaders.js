define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var QueryExecutionHttpHeaders = {};
QueryExecutionHttpHeaders.ACCEPT_FLAT_DATA = 'application/flatData+json';
QueryExecutionHttpHeaders.ACCEPT_MULTI_LEVEL_DATA = 'application/multiLevelData+json';
QueryExecutionHttpHeaders.ACCEPT_MULTI_AXIS_DATA = 'application/multiAxisData+json';
QueryExecutionHttpHeaders.ACCEPT_ALL_DATA = [QueryExecutionHttpHeaders.ACCEPT_FLAT_DATA, QueryExecutionHttpHeaders.ACCEPT_MULTI_LEVEL_DATA, QueryExecutionHttpHeaders.ACCEPT_MULTI_AXIS_DATA].join(', ');
QueryExecutionHttpHeaders.ACCEPT_NO_FLAT = [QueryExecutionHttpHeaders.ACCEPT_MULTI_LEVEL_DATA, QueryExecutionHttpHeaders.ACCEPT_MULTI_AXIS_DATA].join(', ');
QueryExecutionHttpHeaders.CONTENT_TYPE_PROVIDED_QUERY = 'application/execution.providedQuery+json';
QueryExecutionHttpHeaders.CONTENT_TYPE_MULTI_LEVEL_QUERY = 'application/execution.multiLevelQuery+json';
QueryExecutionHttpHeaders.CONTENT_TYPE_MULTI_AXIS_QUERY = 'application/execution.multiAxisQuery+json';
module.exports = QueryExecutionHttpHeaders;

});