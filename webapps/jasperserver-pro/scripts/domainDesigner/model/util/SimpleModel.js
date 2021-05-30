define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var classUtil = require("runtime_dependencies/js-sdk/src/common/util/classUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SimpleModel = classUtil.extend({
  constructor: function constructor(attributes, options) {
    if (_.isFunction(this.defaults)) {
      this.defaults = _.partial(this.defaults, options);
    }

    attributes = _.defaults(attributes || {}, _.result(this, 'defaults') || {});
    this.attributes = {};
    this.set(attributes);
  },
  set: function set(options) {
    var attributeName, value;

    if (_.isString(arguments[0])) {
      attributeName = arguments[0];
      value = arguments[1];
    } else if (_.isObject(arguments[0])) {
      value = arguments[0];
    }

    if (attributeName) {
      this.attributes[attributeName] = value;
    } else if (value) {
      _.each(value, function (value, key) {
        this.attributes[key] = value;
      }, this);
    }
  },
  get: function get(attributeName) {
    return this.attributes[attributeName];
  },
  toJSON: function toJSON() {
    return JSON.parse(JSON.stringify(this.attributes));
  }
});
module.exports = SimpleModel;

});