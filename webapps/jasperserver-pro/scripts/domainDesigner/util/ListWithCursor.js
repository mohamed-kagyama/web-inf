define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var underscoreMethods = ['find', 'findWhere', 'each', 'map', 'filter', 'where', 'indexOf', 'last', 'size'];

var ListWithCursor = function ListWithCursor(options) {
  options = options || {};
  this.setList(options.items, options.position);
};

_.each(underscoreMethods, function (method) {
  ListWithCursor.prototype[method] = function () {
    var args = [this._list].concat(Array.prototype.slice.call(arguments, 0));
    return _[method].apply(_, args);
  };
});

_.extend(ListWithCursor.prototype, {
  get: function get(position) {
    position = this._getPositionOrCurrent(position);
    return this._list[position];
  },
  add: function add(item, position) {
    position = this._getPositionOrNext(position);

    this._list.splice(position, 0, item);

    return this.setPosition(position);
  },
  replace: function replace(item, position) {
    position = this._getPositionOrNext(position);
    this._list[position] = item;
    return this.setPosition(position);
  },
  removeAt: function removeAt(position) {
    var currentPosition = this._getPositionOrCurrent();

    this._list.splice(position, 1);

    if (position < currentPosition) {
      return this.setPosition(this._cursor - 1);
    }
  },
  removeAfter: function removeAfter(position) {
    position = this._getPositionOrCurrent(position);

    this._list.splice(position + 1);

    if (position >= 0) {
      return this.setPosition(Math.min(this._list.length - 1, this._cursor));
    }
  },
  getList: function getList() {
    return _.clone(this._list);
  },
  setList: function setList(list, position) {
    this._list = list || [];
    var size = this.size();

    if (_.isUndefined(position)) {
      this._cursor = size > 0 ? size - 1 : -1;
    } else {
      this._cursor = size > 0 ? Math.max(0, Math.min(size - 1, position)) : -1;
    }
  },
  getPosition: function getPosition() {
    return this._cursor;
  },
  setPosition: function setPosition(position) {
    if (position >= 0 && position < this._list.length) {
      this._cursor = position;
    } else {
      throw new Error('Invalid cursor position ' + position);
    }

    return this;
  },
  forward: function forward() {
    var position = Math.max(0, this._list.length - 1);
    return this.setPosition(position);
  },
  rewind: function rewind() {
    return this.setPosition(0);
  },
  next: function next() {
    if (this._cursor < this._list.length - 1) {
      this.setPosition(this._cursor + 1);
    }

    return this;
  },
  previous: function previous() {
    if (this._cursor > 0) {
      this.setPosition(this._cursor - 1);
    }

    return this;
  },
  findLastIndex: function findLastIndex(predicate) {
    var reversedList = _.clone(this._list).reverse(),
        listSize = this.size();

    var index = -1;

    _.find(reversedList, function (item, i) {
      if (predicate(item, listSize - (i + 1))) {
        index = i;
        return true;
      }
    });

    if (index > -1) {
      return listSize - (index + 1);
    } else {
      return index;
    }
  },
  _getPositionOrCurrent: function _getPositionOrCurrent(position) {
    return typeof position !== 'undefined' ? position : this._cursor;
  },
  _getPositionOrNext: function _getPositionOrNext(position) {
    return typeof position !== 'undefined' ? position : this._cursor + 1;
  }
});

module.exports = ListWithCursor;

});