define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var RepositoryResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = RepositoryResourceModel.extend({
  _getSaveUrlOptions: function _getSaveUrlOptions(options) {
    var skipDataBaseMetadataCheck = options.skipDataBaseMetadataCheck;
    options = RepositoryResourceModel.prototype._getSaveUrlOptions.call(this, options);
    options = _.omit(options, 'skipDataBaseMetadataCheck');
    options = _.extend({}, options, {
      url: options.url + '&skipDataBaseMetadataCheck=' + (skipDataBaseMetadataCheck === true)
    });
    return options;
  }
});

});