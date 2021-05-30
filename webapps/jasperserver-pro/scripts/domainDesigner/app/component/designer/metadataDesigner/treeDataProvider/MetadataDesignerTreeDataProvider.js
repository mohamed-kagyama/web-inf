define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerTreeDataProvider = function MetadataDesignerTreeDataProvider(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerTreeDataProvider.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'getData', 'getSelectedResources');

    this.state = {};
    this.searchKeywordHolder = options.searchKeywordHolder;
    this.dataProvider = options.dataProvider;
    this.selectedResourcesProvider = options.selectedResourcesProvider;
  },
  // public methods
  setState: function setState(state) {
    this.state = _.clone(state);
    this.setSelection(state.selection);
  },
  setSearchKeyword: function setSearchKeyword(searchKeyword) {
    this.searchKeywordHolder.setKeyword(searchKeyword);
  },
  getData: function getData(options) {
    var self = this;
    return this.dataProvider.getData(this.state).then(function (result) {
      return {
        data: self._sliceData(result.data, options),
        total: result.total
      };
    });
  },
  getSelectedResources: function getSelectedResources() {
    return this.selectedResourcesProvider.getSelectedResources(this.state);
  },
  setSelection: function setSelection(resources) {
    if (resources) {
      resources = _.isArray(resources) ? resources : [resources];
      var selection = {};

      _.each(resources, function (resource) {
        selection[resource] = true;
      });

      this.state.selection = selection;
    }
  },
  // private
  _sliceData: function _sliceData(data, options) {
    var offset = options.offset,
        limit = options.limit;
    return data.slice(offset, offset + limit);
  }
});

module.exports = MetadataDesignerTreeDataProvider;

});