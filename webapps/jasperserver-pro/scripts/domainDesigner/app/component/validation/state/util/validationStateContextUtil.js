define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../../../../model/util/resourcePropertiesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function setDataSource(context, dataSourceUri) {
  context.dataSourceUri = dataSourceUri;

  if (context.domainResource) {
    context.domainResource.dataSource.dataSourceReference.uri = dataSourceUri;
  }
}

function setDomainResource(context, domainResource) {
  var dataSourceUri = resourcePropertiesUtil.getEmbeddedResourceUri(domainResource.dataSource);
  context.dataSourceUri = dataSourceUri;
  context.domainResource = domainResource;
}

function shouldInitializeNewDomainByDataSourceUri(context) {
  return context.dataSourceUri && !context.domainResource && !context.domainUri;
}

function isSchemasMapped(context) {
  var isSchemaPairsUndefined = _.isUndefined(context.schemaPairs),
      isSchemaPairsNotSet = _.isNull(context.schemaPairs);

  return !(isSchemaPairsUndefined || isSchemaPairsNotSet);
}

module.exports = {
  setDataSource: setDataSource,
  setDomainResource: setDomainResource,
  shouldInitializeNewDomainByDataSourceUri: shouldInitializeNewDomainByDataSourceUri,
  isSchemasMapped: isSchemasMapped
};

});