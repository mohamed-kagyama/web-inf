define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataStore = function DataStore(options) {
  this.initialize(options);
};

_.extend(DataStore.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.createCollectionsFactory = options.createCollectionsFactory;
    this.collections = this.createCollectionsFactory.create();
    this.dataAdapter = options.dataAdapter;

    if (options.data) {
      this.deserialize(options.data, this.dataAdapter);
    } else if (options.collections) {
      this._fromCollections(this.collections, options.collections);
    }
  },
  getCollection: function getCollection(name) {
    return this.collections[name];
  },
  getCollections: function getCollections() {
    return _.clone(this.collections);
  },
  serialize: function serialize(dataAdapter) {
    dataAdapter = dataAdapter || this.dataAdapter;
    return dataAdapter.serialize(this.collections);
  },
  deserialize: function deserialize(data, dataAdapter) {
    dataAdapter = dataAdapter || this.dataAdapter;
    var collectionsConfig = dataAdapter.deserialize(data);

    this._fromCollections(this.collections, collectionsConfig);
  },
  clone: function clone(dataAdapter) {
    dataAdapter = dataAdapter || this.dataAdapter;
    var data = this.serialize(dataAdapter);
    return dataAdapter.deserialize(data);
  },
  _fromCollections: function _fromCollections(collections, collectionsConfig) {
    _.each(collectionsConfig, function (collection, name) {
      this._fromArray(collections[name], collection.toArray(true));
    }, this);
  },
  _fromArray: function _fromArray(collection, array) {
    collection.fromArray(array);
  }
});

module.exports = DataStore;

});