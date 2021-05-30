define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Collection = require('./Collection');

var IndexSet = require('./IndexSet');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IndexedCollection = function IndexedCollection(collection, options) {
  Collection.apply(this, arguments);
};

_.extend(IndexedCollection.prototype, Collection.prototype, {
  fromArray: function fromArray(array, options) {
    options = options || {};
    Collection.prototype.fromArray.call(this, array, options);

    this._createIndexSet(options.indexConfig || [], options);
  },
  by: function by(obj) {
    var keys = _.keys(obj),
        firstKey,
        value;

    if (keys.length === 1) {
      firstKey = _.first(keys);
      value = this.indexSet.getItem(firstKey, obj[firstKey]);

      if (!_.isUndefined(value)) {
        return value;
      }
    }

    var result = this.findWhere(obj);

    if (!_.isUndefined(result)) {
      this.indexSet.addItems(result);
    }

    return result;
  },
  add: function add(item, index) {
    if (this._chain) {
      throw new Error('Chainable collection is read-only');
    }

    Collection.prototype.add.call(this, item, index);
    this.indexSet.addItems(item);
    return this;
  },
  remove: function remove(index, count) {
    if (this._chain) {
      throw new Error('Chainable collection is read-only');
    }

    var items = Collection.prototype.remove.call(this, index, count);
    this.indexSet.removeItems(items);
    return items;
  },
  _getCollectionClass: function _getCollectionClass() {
    return IndexedCollection;
  },
  _createIndexSet: function _createIndexSet(indexConfig, options) {
    options = options || {};
    this.indexSet = new IndexSet(indexConfig);

    if (options.eagerIndexing) {
      this.indexSet.addItems(this.collection);
    }
  }
});

module.exports = IndexedCollection;

});