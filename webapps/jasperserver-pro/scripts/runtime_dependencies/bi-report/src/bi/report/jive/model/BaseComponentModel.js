define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  constructor: function constructor(attributes, options) {
    options || (options = {});
    this.parent = options.parent;
    Backbone.Model.prototype.constructor.call(this, attributes, options);
  },
  // internal functions
  _notify: function _notify(evt) {
    // bubble the event
    this.parent._notify(evt);
  },
  handleServerError: function handleServerError(result) {
    var uiModuleType = this.get('uiModuleType');
    uiModuleType && uiModuleType.handleServerError(result);
  },
  handleClientError: function handleClientError(result) {
    var uiModuleType = this.get('uiModuleType');
    uiModuleType && uiModuleType.handleClientError(result);
  }
});

});