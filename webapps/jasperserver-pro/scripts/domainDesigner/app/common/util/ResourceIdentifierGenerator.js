define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResourceIdentifierGenerator = function ResourceIdentifierGenerator(options) {
  this.initialize(options);
};

_.extend(ResourceIdentifierGenerator.prototype, {
  initialize: function initialize(options) {
    var template = options.template || '{{= originalName + \'_\' + sequenceNumber}}';
    this.template = _.isString(template) ? _.template(template) : template;
    this.sequenceGenerator = options.sequenceGenerator;

    this.exists = options.exists || function () {
      return false;
    };
  },
  generate: function generate(originalName, exists) {
    var name = originalName || this._getIdentifier();

    exists = exists || this.exists;

    while (exists(name)) {
      name = this._getIdentifier(originalName);
    }

    return name;
  },
  reset: function reset() {
    this.sequenceGenerator.reset && this.sequenceGenerator.reset();
  },
  _getIdentifier: function _getIdentifier(originalName) {
    return this.template({
      originalName: originalName || '',
      sequenceNumber: this.sequenceGenerator.next()
    });
  }
});

module.exports = ResourceIdentifierGenerator;

});