define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var binarySearch = require("../../../util/binarySearch");

var IndexedCollection = require('./IndexedCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EntityCollection = function EntityCollection(collection, options) {
  options = options || {};
  IndexedCollection.call(this, collection, options);
  this._ordered = options.ordered;
};

_.extend(EntityCollection.prototype, IndexedCollection.prototype, {
  fromArray: function fromArray(array, options) {
    options = _.defaults(options || {}, {
      indexConfig: [{
        name: 'id'
      }]
    });
    IndexedCollection.prototype.fromArray.call(this, array, options);
  },
  indexOf: function indexOf(obj) {
    if (this._ordered && obj && obj.id) {
      var id = obj.id;
      return binarySearch(this.collection, function (entity) {
        return id - entity.id;
      });
    } else {
      return IndexedCollection.prototype.indexOf.call(this, obj);
    }
  },
  byId: function byId(id) {
    if (this._ordered) {
      var position = this.indexOf({
        id: id
      });
      return this.at(position);
    } else {
      return this.byField('id', id);
    }
  },
  removeById: function removeById(id) {
    var position = this.indexOf({
      id: id
    });

    if (position >= 0) {
      return this.remove(position);
    }
  },
  _getCollectionClass: function _getCollectionClass() {
    return EntityCollection;
  }
});

module.exports = EntityCollection;

});