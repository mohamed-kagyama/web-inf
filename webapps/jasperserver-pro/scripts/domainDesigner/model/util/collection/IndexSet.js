define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Index = require('./Index');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IndexSet = function IndexSet(options) {
  options = options || {};
  this.indexConfig = options;
  this.indexes = {};
};

_.extend(IndexSet.prototype, {
  hasIndex: function hasIndex(name) {
    return !_.isUndefined(this._getIndexConfig(name));
  },
  getItem: function getItem(indexName, value) {
    return this._getItemFromIndex(this.indexes[indexName], value);
  },
  addItems: function addItems(items) {
    items = _.isArray(items) ? items : [items];
    var i,
        length = this.indexConfig.length,
        config;

    for (i = 0; i < length; i++) {
      config = this.indexConfig[i];

      this._addItemsToIndex(config, items);
    }
  },
  removeItems: function removeItems(items) {
    items = _.isArray(items) ? items : [items];
    var length = items.length,
        i;

    for (i = 0; i < length; i++) {
      this._removeItem(items[i]);
    }
  },
  clearIndex: function clearIndex(indexName) {
    this.indexes[indexName].clear();
  },
  dropIndex: function dropIndex(indexName) {
    var config = this._getIndexConfig(indexName),
        configPos = _.indexOf(this.indexConfig, config);

    delete this.indexes[indexName];
    this.indexConfig.splice(configPos, 1);
  },
  addIndex: function addIndex(config, items) {
    items = items && (_.isArray(items) ? items : [items]);
    this.indexConfig.push(config);
    items && this._addItemsToIndex(config, items);
  },
  _removeItem: function _removeItem(item) {
    var i,
        length = this.indexConfig.length,
        indexName,
        index,
        value;

    for (i = 0; i < length; i++) {
      indexName = this.indexConfig[i].name;
      index = this.indexes[indexName];

      if (index) {
        value = item[indexName];

        if (typeof index.getValue(value) !== 'undefined') {
          this._removeItemFromIndex(index, value);
        }
      }
    }
  },
  _addItemsToIndex: function _addItemsToIndex(config, items) {
    var index,
        length = items.length,
        i;

    if (!this.indexes[config.name]) {
      this.indexes[config.name] = new Index({
        name: config.name,
        type: config.type || 'number'
      });
    }

    index = this.indexes[config.name];

    for (i = 0; i < length; i++) {
      this._addItemToIndex(index, items[i]);
    }
  },
  _getIndexConfig: function _getIndexConfig(name) {
    return _.find(this.indexConfig, function (config) {
      return config.name === name;
    });
  },
  _getItemFromIndex: function _getItemFromIndex(index, value) {
    return index && index.getValue(value);
  },
  _addItemToIndex: function _addItemToIndex(index, item) {
    index.addToIndex(item);
  },
  _removeItemFromIndex: function _removeItemFromIndex(index, value) {
    index.removeFromIndex(value);
  }
});

module.exports = IndexSet;

});