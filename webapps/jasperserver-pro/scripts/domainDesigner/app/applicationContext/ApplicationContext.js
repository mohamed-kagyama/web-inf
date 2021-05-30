define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ApplicationContext = function ApplicationContext() {
  this._container = {};
};

_.extend(ApplicationContext.prototype, {
  // Register a module with given name
  register: function register(name, module) {
    if (typeof this._container[name] !== 'undefined') {
      throw new Error('Module [' + name + '] already registered');
    }

    this._container[name] = module;
  },
  // retrieve module which has ben registered earlier
  get: function get(name) {
    if (typeof this._container[name] === 'undefined') {
      throw new Error('Module [' + name + '] is not registered');
    }

    return this._container[name];
  },
  // retrieve all registered module names
  getNames: function getNames() {
    return _.keys(this._container);
  },
  // remove registered module from context
  // call cleanup procedure for the module if applicable
  remove: function remove(name, cleanup) {
    var module = this.get(name);

    if (_.isFunction(cleanup)) {
      cleanup(module);
    }

    delete this._container[name];
  }
});

module.exports = ApplicationContext;

});