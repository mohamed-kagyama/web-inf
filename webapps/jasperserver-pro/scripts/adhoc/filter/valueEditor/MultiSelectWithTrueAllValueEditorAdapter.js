define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var MultiSelectValueEditorAdapter = require('./MultiSelectValueEditorAdapter');

var MultiSelectWithTrueAll = require("runtime_dependencies/js-sdk/src/components/multiSelect/view/MultiSelectWithTrueAll");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var selectedItemsDataProviderSorterFactory = require("runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/selectedItemsDataProviderSorterFactory");

var OlapFilterValueFormatter = require('../format/OlapFilterValueFormatter');

var filterValueFormatter = require('../format/filterValueFormatter');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = MultiSelectValueEditorAdapter.extend({
  createList: function createList() {
    return new MultiSelectWithTrueAll({
      getData: _.bind(this.model.dataProvider.getData, this.model),
      selectedListOptions: {
        formatLabel: this.model.isOlap ? new OlapFilterValueFormatter(this.model.get('isFirstLevelInHierarchyAll')).format : filterValueFormatter,
        sortFunc: selectedItemsDataProviderSorterFactory.create(jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_LABEL)
      },
      resizable: true
    });
  },
  _setValueToList: function _setValueToList(options) {
    if (this.model.get('isAnyValue')) {
      this.list.setTrueAll(true);
    } else {
      this.list.setValue(this.getValue(), options);
    }
  }
});

});