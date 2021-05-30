define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FormatModelCache = function FormatModelCache() {
  this.map = {};
  this.keyInfo = {};
};

FormatModelCache.prototype = {
  get: function get(key) {
    if (this.map[key]) {
      return this.map[key].current;
    }

    return null;
  },
  set: function set(key, stateJSON) {
    if (!this.map[key]) {
      this.map[key] = {
        original: _.cloneDeep(stateJSON),
        current: _.cloneDeep(stateJSON)
      };
    } else {
      this.map[key].current = _.cloneDeep(stateJSON);
    }
  },
  createKey: function createKey(applyTo, model, isGroup) {
    var key;

    if (!isGroup) {
      key = applyTo + '-column-' + model.get('columnIndex');
    } else {
      key = applyTo + '-column-' + model.get('forColumns').join('_');
    }

    if (!this.keyInfo[key]) {
      this.keyInfo[key] = {
        applyTo: applyTo,
        model: model
      };
    }

    return key;
  },
  clear: function clear() {
    this.map = {};
    this.keyInfo = {};
  },
  remove: function remove() {}
};
module.exports = FormatModelCache;

});