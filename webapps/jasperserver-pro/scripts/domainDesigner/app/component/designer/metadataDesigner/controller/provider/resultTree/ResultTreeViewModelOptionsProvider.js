define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var metadataDesignerUtil = require("../../../util/metadataDesignerUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResultTreeViewModelOptionsProvider = function ResultTreeViewModelOptionsProvider(options) {
  this.initialize(options);
};

_.extend(ResultTreeViewModelOptionsProvider.prototype, {
  initialize: function initialize(options) {},
  get: function get(state) {
    var metadataResource = metadataDesignerUtil.getCurrentResource(state),
        currentDataSourceType = metadataDesignerUtil.getCurrentDataSourceType(state),
        currentMetadataResourceId = metadataResource && metadataResource.resourceId,
        currentMetadataResourceType = metadataResource && metadataResource.type;
    return {
      currentMetadataResourceId: currentMetadataResourceId,
      currentDataSourceType: currentDataSourceType,
      currentMetadataResourceType: currentMetadataResourceType
    };
  }
});

module.exports = ResultTreeViewModelOptionsProvider;

});