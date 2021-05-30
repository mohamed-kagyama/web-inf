define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ListValueEditorAdapter = require('./ListValueEditorAdapter');

var MultiSelect = require("runtime_dependencies/js-sdk/src/components/multiSelect/view/MultiSelect");

var selectedItemsDataProviderSorterFactory = require("runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/selectedItemsDataProviderSorterFactory");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var OlapFilterValueFormatter = require('../format/OlapFilterValueFormatter');

var filterValueFormatter = require('../format/filterValueFormatter');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ListValueEditorAdapter.extend({
  createList: function createList() {
    return new MultiSelect({
      getData: _.bind(this.model.dataProvider.getData, this.model),
      selectedListOptions: {
        formatLabel: this.model.isOlap ? new OlapFilterValueFormatter(this.model.get('isFirstLevelInHierarchyAll')).format : filterValueFormatter,
        sortFunc: selectedItemsDataProviderSorterFactory.create(jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_LABEL)
      },
      resizable: true
    });
  },
  render: function render() {
    ListValueEditorAdapter.prototype.render.apply(this, arguments);

    this._moveSizer();

    return this;
  },
  _moveSizer: function _moveSizer() {
    var $sizer = this.list.$el.find('.jr-mSizer'); //according to Filter specifics, sizer should be after alert message
    //according to Filter specifics, sizer should be after alert message

    if ($sizer.length) {
      $sizer.detach().insertAfter(this.$('.warning'));
    }
  }
});

});