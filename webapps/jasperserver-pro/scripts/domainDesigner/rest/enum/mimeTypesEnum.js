define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  TEXT_PLAIN: 'text/plain',
  GENERIC_XML: 'application/xml',
  GENERIC_JSON: 'application/json',
  OCTET_STREAM: 'application/octet-stream',
  BUNDLE_PROPERTIES: 'application/properties',
  DATASET_JSON: 'application/dataset+json',
  DOMAIN_RESOURCE: 'application/repository.domain+json',
  DOMAIN_SCHEMA_RESOURCE_JSON: 'application/repository.domainSchema+json',
  REPOSITORY_FILE: 'application/repository.file+json',
  REPOSITORY_FOLDER: 'application/repository.folder+json',
  RESOURCE_LOOKUP: 'application/repository.resourceLookup+json',
  QUERY_EXECUTION_RESULT_SET: 'application/dataset.metadata+json',
  DOM_EL_CONTEXT: 'application/contexts.domElExpressionContext+json; charset=UTF-8',
  DOM_EL_COLLECTION_CONTEXT: 'application/contexts.domElExpressionCollectionContext+json; charset=UTF-8',
  SQL_EXECUTION_REQUEST: 'application/connections.sqlExecutionRequest+json',
  SQL_EXECUTION_REQUEST_CONTEXT: 'application/contexts.sqlExecutionRequest+json',
  DATA_SOURCE_METADATA: 'application/contexts.partialMetadataOptions+json',
  ADHOC_MULTILEVEL_QUERY: 'application/execution.multiLevelQuery+json',
  ADHOC_MULTILEVEL_DATA: 'application/multiLevelData+json',
  PROFILE_ATTRIBUTES_COLLECTION: 'application/attributes.collection+json'
};

});