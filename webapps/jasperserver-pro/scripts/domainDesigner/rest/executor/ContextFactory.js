define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var mimeTypesEnum = require("../enum/mimeTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ContextFactory = function ContextFactory(options) {
  this.initialize(options);
};

_.extend(ContextFactory.prototype, {
  initialize: function initialize(options) {
    this.request = options.request;
    this.url = options.url;
  },
  create: function create(options) {
    var accept = options.accept || mimeTypesEnum.GENERIC_JSON;
    options = _.defaults({
      type: 'POST',
      headers: {
        'Accept': accept
      },
      processData: false,
      dataType: 'json',
      url: this.url
    }, _.omit(options, ['accept']));
    return this.request(options);
  }
});

module.exports = ContextFactory;

});