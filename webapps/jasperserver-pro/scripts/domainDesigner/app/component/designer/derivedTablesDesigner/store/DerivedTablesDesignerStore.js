define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var SimpleModel = require("../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerStore = SimpleModel.extend({
  defaults: function defaults() {
    return {
      id: null,
      type: schemaEntitiesEnum.DERIVED_TABLE,
      dataSourceId: null,
      parentId: null,
      name: '',
      originalName: '',
      query: '',
      isQueryRunning: false,
      queryRunningSource: '',
      tableNameErrorMessage: '',
      queryErrorMessage: '',
      selectedFieldsErrorMessage: '',
      queryAfterPreviousExecution: '',
      listWithSelectionHeight: 0,
      //Do not put initial value for fields so it will not be observed by vuejs
      // fields: [],
      visibleFields: [],
      selection: {
        rangeStart: 0,
        fields: {}
      },
      top: 0,
      scrollPos: 0,
      height: 0,
      queryResultSetHeight: 0
    };
  },
  reset: function reset(options) {
    this.set(_.extend({}, this.defaults(), options));
  }
});
module.exports = DerivedTablesDesignerStore;

});