define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DataSourceGroupNameIsEmptySpecification = require("../../model/specification/DataSourceGroupNameIsEmptySpecification");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSpecifications(context, options) {
  context.register('dataSourceGroupNameIsEmptySpecification', new DataSourceGroupNameIsEmptySpecification({
    clientDataSourceGroupService: context.get('clientDataSourceGroupService')
  }));
}

module.exports = createSpecifications;

});