define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var JobsView = require("runtime_dependencies/jrs-ui/src/scheduler/view/JobsView");

var JobsCollectionPro = require('../collection/JobsCollectionPro');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = JobsView.extend({
  _getJobsCollection: function _getJobsCollection(options) {
    return new JobsCollectionPro(null, options);
  }
});

});