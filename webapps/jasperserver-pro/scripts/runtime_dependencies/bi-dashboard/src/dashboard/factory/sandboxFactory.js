define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Sandbox = require('../Sandbox');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  /**
       * @memberof  factory:sandboxFactory
       * @param {string|number} key - sandbox instance key. Used for cache.
       * @desc gets Sandbox instance by given key.
       * @returns {Sandbox} - new Sandbox instance. If key was not passed, returns null.
       */
  get: _.memoize(function (key) {
    if (!key) {
      return null;
    }

    return new Sandbox();
  })
};

});