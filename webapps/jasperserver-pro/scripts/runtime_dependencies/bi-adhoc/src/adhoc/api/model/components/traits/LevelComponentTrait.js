define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  level: function level() {
    var self = this,
        idFilter = function idFilter(level) {
      return self.get('reference') === level.get('id');
    },
        hierarchicalNameFilter = function hierarchicalNameFilter(level) {
      return self.get('reference') === level.get('hierarchicalName');
    };

    return this.adHocModel.dataSet.query.cols.axis.find(idFilter) || this.adHocModel.dataSet.query.rows.axis.find(idFilter) || this.adHocModel.dataSet.query.cols.axis.find(hierarchicalNameFilter) || this.adHocModel.dataSet.query.rows.axis.find(hierarchicalNameFilter);
  },
  label: function label(showSummaryFunction) {
    return this.has('label') ? this.get('label') : this.level().label(showSummaryFunction);
  }
};

});