define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var underscoreCollectionChainMethods = ['map', 'filter', 'where', 'reject', 'sortBy', 'initial', 'rest', 'compact'];
var underscoreCollectionNoChainMethods = ['each', 'reduce', 'reduceRight', 'find', 'findWhere', 'every', 'some', 'any', 'max', 'min', 'size', 'first', 'last'];

function callFunc(func, self, collection, args) {
  switch (args.length) {
    case 0:
      return func.call(self, collection);

    case 1:
      return func.call(self, collection, args[0]);

    case 2:
      return func.call(self, collection, args[0], args[1]);

    case 3:
      return func.call(self, collection, args[0], args[1], args[2]);

    case 4:
      return func.call(self, collection, args[0], args[1], args[2], args[3]);
  }
}

function addUndescoreChainableMethods() {
  _.each(underscoreCollectionChainMethods, function (method) {
    Collection.prototype[method] = function () {
      var result = callFunc(_[method], null, this.collection, arguments);

      if (this._chain) {
        result = this._createCollection(result, {
          chain: true
        });
      }

      return result;
    };
  });
}

function addUndescoreNotChainableMethods() {
  _.each(underscoreCollectionNoChainMethods, function (method) {
    Collection.prototype[method] = function () {
      return callFunc(_[method], null, this.collection, arguments);
    };
  });
}

var Collection = function Collection(collection, options) {
  options = options || {};

  if (options.chain) {
    this._chain = true;
  }

  this.fromArray(collection, options);
};

_.extend(Collection.prototype, {
  fromArray: function fromArray(array, options) {
    this.collection = array && _.isArray(array) ? array : [];
  },
  toArray: function toArray(original) {
    if (original) {
      return this.collection;
    } else {
      return _.clone(this.collection);
    }
  },
  by: function by(obj) {
    return this.findWhere(obj);
  },
  byField: function byField(fieldName, fieldValue) {
    var obj = {};
    obj[fieldName] = fieldValue;
    return this.by(obj);
  },
  chain: function chain() {
    return this._createCollection(this.collection, {
      chain: true
    });
  },
  add: function add(item, index) {
    index = _.isNumber(index) ? index : this.size();

    if (_.isArray(item)) {
      this.collection.splice.apply(this.collection, [index, 0].concat(item));
    } else {
      this.collection.splice(index, 0, item);
    }

    return this;
  },
  remove: function remove(index, count) {
    count = count || 1;
    return this.collection.splice(index, count);
  },
  indexOf: function indexOf(obj) {
    var callback,
        index = -1;

    if (_.isFunction(obj)) {
      callback = obj;
      this.find(function (value, i) {
        if (callback(value)) {
          index = i;
          return true;
        }
      });
    } else {
      obj = this.by(obj);
      index = obj ? _.indexOf(this.collection, obj) : -1;
    }

    return index;
  },
  at: function at(index) {
    return this.collection[index];
  },
  concat: function concat(array) {
    if (this._isCollection(array)) {
      array = array.toArray(true);
    }

    return this._createCollection(this.collection.concat(array));
  },
  _isCollection: function _isCollection(collection) {
    // duck type check for Collection
    return collection && _.isFunction(collection.chain) && _.isArray(collection.collection);
  },
  _createCollection: function _createCollection(array, options) {
    var Collection = this._getCollectionClass();

    return new Collection(array, options);
  },
  // Should be overridden in each successor
  _getCollectionClass: function _getCollectionClass() {
    return Collection;
  }
});

addUndescoreChainableMethods();
addUndescoreNotChainableMethods();
module.exports = Collection;

});