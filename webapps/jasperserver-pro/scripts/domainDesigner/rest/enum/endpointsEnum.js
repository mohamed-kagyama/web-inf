define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  QUERY_EXECUTIONS_SERVICE: jrsConfigs.contextPath + '/rest_v2/queryExecutions',
  RESOURCES_SERVICE: jrsConfigs.contextPath + '/rest_v2/resources',
  RESOURCES_SEARCH_SERVICE: jrsConfigs.contextPath + '/rest_v2/api/resources',
  CONTEXTS_SERVICE: jrsConfigs.contextPath + '/rest_v2/contexts',
  DATA_SOURCE_METADATA: '/metadata',
  PROFILE_ATTRIBUTES_SERVICE: jrsConfigs.contextPath + '/rest_v2/attributes'
};

});