define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var Sandbox = function Sandbox() {
  this.model = new Backbone.Model();
};

_.extend(Sandbox.prototype, {
  /* API */

  /**
   * Get value by passed key
   * @param key
   * @returns {*}
   */
  get: function get(key) {
    return this.model.get(key);
  },

  /**
   * Set passed value by passed key
   * @param key
   * @param value
   */
  set: function set(key, value) {
    this.model.set(key, value);
  },

  /**
   * Ser observer to listen for property chane
   * @param path
   * @param observer
   * @returns {*}
   */
  on: function on(path, observer) {
    this.model.on('change:' + path, observer);
  },

  /**
   * Disable observer for property change
   * @param path
   * @param observer
   */
  off: function off(path, observer) {
    this.model.off('change:' + path, observer);
  }
});

module.exports = Sandbox;

});