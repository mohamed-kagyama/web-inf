define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var RepositoryFileModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryFileModel");

var repositoryFileTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryFileTypes");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = RepositoryFileModel.extend({
  stringifyContent: true,
  defaults: function () {
    return _.extend({}, RepositoryFileModel.prototype.defaults, {
      type: repositoryFileTypes.DASHBOARD_COMPONENTS_SCHEMA
    });
  }()
});

});