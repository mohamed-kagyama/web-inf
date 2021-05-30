define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var JobsCollection = require("runtime_dependencies/jrs-ui/src/scheduler/collection/JobsCollection");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = JobsCollection.extend({
  _secondFetchPart: function _secondFetchPart() {
    // Skip options fetching when we are working with dashboard
    if (this.options.isDashboard) {
      this.getJobsOfAllReportsWeHave();
      return;
    }

    JobsCollection.prototype._secondFetchPart.apply(this, arguments);
  }
});

});