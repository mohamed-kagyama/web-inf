define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  constructor: function constructor(attr, options) {
    options || (options = {});
    options.parse = true;
    Backbone.Model.prototype.constructor.apply(this, [attr, options]);
  },
  initialize: function initialize(attributes, options) {},
  parse: function parse(attr) {
    this.componentType = attr.componentType;
    return attr.properties;
  },
  toJSON: function toJSON() {
    var json = {
      properties: Backbone.Model.prototype.toJSON.call(this),
      components: this.components.toJSON(),
      componentType: this.componentType
    };
    return json;
  },
  getProperties: function getProperties() {
    return Backbone.Model.prototype.toJSON.call(this);
  },
  where: function where(what) {
    return this.components.where(what);
  },
  findWhere: function findWhere(what) {
    return this.components.findWhere(what);
  }
});

});