define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../../../../model/util/resourcePropertiesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  replace: function replace(state, dataSourceUri) {
    var uri = dataSourceUri || resourcePropertiesUtil.getEmbeddedResourceUri(state.dataSource);
    var dataSource = {
      dataSourceReference: {
        uri: uri
      }
    };
    return _.extend({}, state, {
      dataSource: dataSource
    });
  }
};

});